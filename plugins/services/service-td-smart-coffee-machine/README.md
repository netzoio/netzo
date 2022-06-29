<div align="center">
  <a href="https://netzo.io" target="_blank" >
    <img height="50" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/services/service-td-smart-coffee-machine/src/assets/icon.png" style="margin: 12px 0px" />
  </a>

  <h1 style="padding: 6px 0px 24px 0px">service-td-smart-coffee-machine</h1>
</div>

An open-source service plugin for a fictional smart coffee machine.

A fictional smart coffee machine in order to demonstrate the capabilities of Web of Things (WoT) and the usage of node-wot API. In the world of Web of Thing properties, actions and events provided by a Thing are called Property Affordances, Action Affordances and Event Affordances, respectively. The difference of each becomes clear as we proceed the tutorial. So, we imagine a smart coffee machine which provides the following Property Affordances:

- allAvailableResources - that is a current level of all available resources (i.e. water, milk, chocolate and coffee beans) given as an integer percentage for each particular resource. This data is read-only and is obtained from the machine’s sensors but can also be set manually via the availableResourceLevel property (next one) in case the sensors are broken.
- availableResourceLevel - that is a current level of a particular resource, which should be specified as a query string (called uriVariables in node-wot). This data is obtained from the previous property (allAvailableResources). The difference is in usage of uriVariables and that this property is also writable, so that it can be used to override the values of allAvailableResources.
possibleDrinks - a read-only list of possible drinks in general. Doesn’t depend on the available resources.
- servedCounter - the total number of served beverages. This property is writable. The data is obtained from the machine but can also be set manually (thus, writable). The case for that is explained below.
- maintenanceNeeded - a boolean value showing whether the machine needs a maintenance. The property is observable, which means in WoT that a user can get notified every time the value of this property changes. Automatically set to true when the servedCounter property exceeds 1000.
- schedules - a read-only array containing scheduled tasks, i.e. a task which should be performed according to a specific schedule.

The idea behind servedCounter and maintenanceNeeded is that, every time servedCounter exceeds 1000 the maintenanceNeeded flag is set to true. And since this value is observable a “maintainer” gets notified, who then comes and performs the maintenance of the machine, and afterwards sets the servedCounter and maintenanceNeeded to 0 and false, respectively.

The smart coffee machine has also the following Action Affordances:

- makeDrink - make a drink from the list of possible beverages. Accepts drink id, size and quantity as uriVariables. Brews one medium americano if no uriVariables are specified.
- setSchedule - add a scheduled task to the schedules property. Accepts drink id, size, quantity, time and mode as body of a request (i.e. a request payload). Assumes one medium americano if not specified, but time and mode are mandatory fields. Notice that, even though the schedules property is read-only, it’s being modified through the setSchedule action. That’s the same principle as creating setters for private properties in object-oriented programming languages.

Finally, the coffee machine has the following Event Affordances:

- outOfResource - an out-of-resource event. Emitted when the available resource level is not sufficient for a desired drink.

### Links

- [Marketplace](https://app.netzo.io/marketplace/service-td-smart-coffee-machine)
- [Thing Description](http://plugfest.thingweb.io:8083/smart-coffee-machine)
- [Github Repo Eclipse Thingweb node-wot](https://github.com/eclipse/thingweb.node-wot)
- [Source](http://plugfest.thingweb.io/examples/smart-coffee-machine.html)

<div align="center">
  <h4>© Netzo Plugin</h4>
</div>

### Acknowledgments
