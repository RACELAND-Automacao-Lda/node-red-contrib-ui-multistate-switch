/**
 * Copyright 2021 Bart Butenaers & hotNipi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    var settings = RED.settings;

    function HTML(config) { 
        // Replace the dots in the id (by underscores), because we use it in element identifiers.
        // And then dots are not allowed, because otherwise you cannot find the element by id!
        config.id = config.id.replace(".", "_");
    
        // The configuration is a Javascript object, which needs to be converted to a JSON string
        var configAsJson = JSON.stringify(config);

        // - Make sure to set the width and height via CSS style (instead of the width and height html element attributes).
        //   This way the dashboard can calculate the size of the div correctly.  See:
        //   https://discourse.nodered.org/t/custom-ui-node-layout-problems/7731/21?u=bartbutenaers)
        // - The slider width: calc((100% - 2em) / 3); takes account of font size and makes itsel 2 unit smaller at the left
        // - Transform: translate(0.25em, 0px); moves quarter amount to right.
        //   That gives you oportunity to use straight percentages for positions (0%, 33%, 66%) (0%, 25%, 50%, 75%)
        var html = String.raw`
        <style>
            .multistate-switch-wrapper{
                border:1px solid var(--nr-dashboard-widgetColor);
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                position:relative;
                margin: auto 0;
            }
            .multistate-slider-wrapper{
                height: 1em;
                padding-top: 0.25em;
                padding-bottom: 0.25em;
                z-index:0
            }
            .multistate-switch-body{
                display: inline-flex;
                justify-content: flex-start;
                width: 100%;
            }
            .multistate-switch-slider{
                width: calc((100% - 2em) / 3);
                background-color: var(--nr-dashboard-widgetColor);
                position: absolute;
                height: 1em;
                transform: translate(0.25em, 0px);
                transition: all .4s ease;
                left: 0%;
                z-index:0;
            }
            .multistate-switch-button{
               width:calc(100% / 3); 
               text-align:center;
               z-index:1;
               outline: none;
               user-select:none;
            }
        </style>

        <div id="multiStateSwitchContainer_` + config.id + `" class="multistate-switch-wrapper" ng-init='init(` + configAsJson + `)'>
            <div class="multistate-switch-body">
                <div class="multistate-slider-wrapper">
                    <div id="multiStateSwitchSlider_` + config.id + `" class="multistate-switch-slider"></div>
                </div>
                <!-- The radio buttons will be inserted here dynamically on the frontend side -->
            </div>
        </div>
        `;

        return html;
    }
    
    function checkConfig(node, conf) {
        if (!conf || !conf.hasOwnProperty("group")) {
            node.error("No group has been specified");
            return false;
        }
        return true;
    }
    
    var ui = undefined;
    
    function MultiStateSwitchNode(config) {
         try {
            var node = this;
            if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }

            RED.nodes.createNode(this, config);

            if (checkConfig(node, config)) { 
                var html = HTML(config);
                var done = ui.addWidget({
                    node: node,
                    group: config.group,
                    order: config.order, 
                    width: config.width,
                    height: config.height,
                    format: html,
                    templateScope: "local",
                    emitOnlyNewValues: false,
                    forwardInputMessages: false,
                    storeFrontEndInputAsState: false,
                    convertBack: function (value) {
                        return value;
                    },
                    beforeEmit: function(msg, value) {
                        return { msg: msg };
                    },
                    beforeSend: function (msg, orig) {
                        if (orig) {
                            return orig.msg;
                        }
                    },
                    initController: function($scope, events) {
                        $scope.flag = true;

                        $scope.init = function (config) {
                            $scope.config = config;

                            $scope.containerDiv = $("#multiStateSwitchContainer_" + config.id)[0];
                            $scope.sliderDivElement = $("#multiStateSwitchSlider_" + config.id)[0];
                            
                            // Get a reference to the sub-DIV element
                            var toggleRadioDiv = $scope.containerDiv.firstElementChild;

                            // Create all the required radio button elements
                            config.options.forEach(function (option, index) {
                                var divElement = document.createElement("div");
                                divElement.setAttribute("class", "multistate-switch-button");
                                divElement.innerHTML = option.label;
                                divElement.addEventListener("click",  function() {
                                    switchStateChanged(option.value);
                                });

                                toggleRadioDiv.appendChild(divElement);
                            });
                        }

                        $scope.$watch('msg', function(msg) {
                            // Ignore undefined messages.
                            if (!msg || !msg.payload) {
                                return;
                            }

                            // The msg.payload contains the new switch state value
                            switchStateChanged(msg.payload);
                        });
                        
                        function switchStateChanged(newValue) {
                            var radioButtonIndex = -1;
      
                            // Try to find an option with a value identical to the specified value
                            $scope.config.options.forEach(function (option, index) {
                                if (option.value === newValue) {
                                    radioButtonIndex = index;
                                }
                            });
                            
                            if (radioButtonIndex >= 0) {
                                var percentage = "0%";
                                
                                if ($scope.config.options.length > 0 && radioButtonIndex >= 0) {
                                    percentage = (100 / $scope.config.options.length) * radioButtonIndex;
                                    $scope.sliderDivElement.style.left = percentage + "%";
                                }
                                    
                                $scope.send({payload: newValue});
                            }
                            else {
                                console.log("No radio button has value '" + newValue + "'");
                            }
                        }
                    }
                });
            }
        }
        catch (e) {
            // Server side errors 
            node.error(e);
            console.trace(e); // stacktrace
        }
		
        node.on("close", function() {
            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("ui_mult_state_switch", MultiStateSwitchNode);
}