# node-red-contrib-ui-multistate-switch
A Node Red node to show a switch with multiple states in the Node-RED dashboard.

All credits for the CSS go to [hotnipi](https://github.com/hotNipi), my partner in crime for this node!

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-ui-multistate-switch
```

## Node usage
This node allows to show a multi-state switch in a few steps:

1. Specify all the available options in the config screen:

   ![Config screen](https://user-images.githubusercontent.com/14224149/108125938-79ca0a00-70a9-11eb-8b0b-4f714ddcab93.png)
   
   The ***label*** is the text that will be displayed, while the ***value*** will be used in the input and output messages.

2. These options will be displayed in the dashboard:

   ![mult_switch_demo](https://user-images.githubusercontent.com/14224149/108126201-da594700-70a9-11eb-8587-5cc11516ae4a.gif)

   As soon as a button is clicked, it's value will be send in the `msg.payload` of the output message.
   
 3. It is also possible to inject an input message, with the new value in the `msg.payload`.  The corresponding option will automatically be selected in the dashboard.

## Example flow

The following flow shows switch button with 2, 3 and 4 states:

![Example flow](https://user-images.githubusercontent.com/14224149/107993849-bb8c7f00-6fdb-11eb-8554-37f1064ce182.png)
```
[{"id":"c500c2da.1d4de","type":"ui_mult_state_switch","z":"2b6f5d19.202242","name":"3-state switch","group":"612af469.b217fc","order":2,"width":"6","height":3,"options":[{"label":"First","value":"first_option"},{"label":"Second","value":"second_option"},{"label":"Third","value":"third_option"}],"x":500,"y":2040,"wires":[["ab8cf66d.e9c0a8"]]},{"id":"ed639ed8.6ee15","type":"inject","z":"2b6f5d19.202242","name":"Select first","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"first_option","payloadType":"str","x":280,"y":2040,"wires":[["c500c2da.1d4de"]]},{"id":"525b9df7.fd9ac4","type":"inject","z":"2b6f5d19.202242","name":"Select second","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"second_option","payloadType":"str","x":290,"y":2080,"wires":[["c500c2da.1d4de"]]},{"id":"61709fbd.30159","type":"inject","z":"2b6f5d19.202242","name":"Select third","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"third_option","payloadType":"str","x":290,"y":2120,"wires":[["c500c2da.1d4de"]]},{"id":"ab8cf66d.e9c0a8","type":"debug","z":"2b6f5d19.202242","name":"Selected option","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":720,"y":2040,"wires":[]},{"id":"a06bed94.e9125","type":"ui_mult_state_switch","z":"2b6f5d19.202242","name":"2-state switch","group":"612af469.b217fc","order":2,"width":"6","height":3,"options":[{"label":"First","value":"first_option"},{"label":"Second","value":"second_option"}],"x":500,"y":1920,"wires":[["b5a3ec9b.a2bec"]]},{"id":"41d8d1ac.d89cf","type":"inject","z":"2b6f5d19.202242","name":"Select first","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"first_option","payloadType":"str","x":280,"y":1920,"wires":[["a06bed94.e9125"]]},{"id":"d7e836b8.55a9f8","type":"inject","z":"2b6f5d19.202242","name":"Select second","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"second_option","payloadType":"str","x":290,"y":1960,"wires":[["a06bed94.e9125"]]},{"id":"b5a3ec9b.a2bec","type":"debug","z":"2b6f5d19.202242","name":"Selected option","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":700,"y":1920,"wires":[]},{"id":"a40f8267.9b53b","type":"ui_mult_state_switch","z":"2b6f5d19.202242","name":"4-state switch","group":"612af469.b217fc","order":2,"width":"6","height":3,"options":[{"label":"First","value":"first_option"},{"label":"Second","value":"second_option"},{"label":"Third","value":"third_option"},{"label":"Fourth","value":"fourth_option"}],"x":500,"y":2180,"wires":[["9e5313ca.d7065"]]},{"id":"995a0091.6ae6c","type":"inject","z":"2b6f5d19.202242","name":"Select first","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"first_option","payloadType":"str","x":280,"y":2180,"wires":[["a40f8267.9b53b"]]},{"id":"a1409338.88ddf","type":"inject","z":"2b6f5d19.202242","name":"Select second","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"second_option","payloadType":"str","x":290,"y":2220,"wires":[["a40f8267.9b53b"]]},{"id":"da2911c4.8d138","type":"inject","z":"2b6f5d19.202242","name":"Select third","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"third_option","payloadType":"str","x":290,"y":2260,"wires":[["a40f8267.9b53b"]]},{"id":"9e5313ca.d7065","type":"debug","z":"2b6f5d19.202242","name":"Selected option","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":720,"y":2180,"wires":[]},{"id":"7b86930f.f70d6c","type":"inject","z":"2b6f5d19.202242","name":"Select fourth","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"fourth_option","payloadType":"str","x":290,"y":2300,"wires":[["a40f8267.9b53b"]]},{"id":"612af469.b217fc","type":"ui_group","z":"","name":"Default","tab":"969376dd.5b27e8","order":1,"disp":true,"width":"6","collapse":false},{"id":"969376dd.5b27e8","type":"ui_tab","z":"","name":"Switch","icon":"dashboard","disabled":false,"hidden":false}]
```

Some notes about the messages:
+ ***Input msg***: the `msg.payload` should contain the value of the option that needs to be selected.
+ ***Output msg***: the `msg.payload` will contain the value of the option that has been selected.

## Use cases
A list of possible use cases for this node:

+ Switch a thermostate on/off manually, or put it on automatic mode (i.e. controlled e.g. by a setpoint profile):

   ![thermostat](https://user-images.githubusercontent.com/14224149/107996107-de209700-6fdf-11eb-9ff4-4974e8cbe9bf.png)

+ Switch a light on/off manually, or put it on automatic mode (i.e; controlled by a PIR sensor):

   ![ligth](https://user-images.githubusercontent.com/14224149/107996070-ca753080-6fdf-11eb-96cd-09907673487d.png)
