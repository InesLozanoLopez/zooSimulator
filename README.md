# Zoo Simulator

This is a zoo simulator building in React and it is responsive.
It contains contains 3 different types of animal:  monkey, giraffe and elephant. The zoo opens with 5 of each type of animal.

Every hour that passes, a random value between 0 and 20 is to be generated for each animal.  This value is passed to the appropriate animal, whose health is then reduced by that percentage of their current health.

The user is able to feed the animals in the zoo.  When this happens, the zoo generates three random values between 10 and 25; one for each type of animal. The health of the respective animals is to be increased by the specified percentage of their current health.  Health is capped at 100%.


When an Elephant has a health below 70% it cannot walk. If its health does not return above 70% once the subsequent hour has elapsed, it is pronounced dead.
When a Monkey has a health below 30%, or a Giraffe below 50%, it is pronounced dead straight away.

The user interface shows the current status of each animal and contain two buttons, one to provoke an hour of time to pass and another to feed the zoo.

The UI updates to reflect each change in state, and the current time at the zoo as it is displayed an informationn table at the end of the screen showing the health of the animals (green for healthy, yellow for ill and read for death)



https://github.com/InesLozanoLopez/zooSimulator/assets/126467080/230ce610-51af-4e9e-8863-866423b72281




## Testing:
<ul>
  <li>Lighthouse Test: The app has been tested with Lighthouse to optimize its performance.</li>
  <li>Axe DevTools: Accessibility testing has been performed using Axe DevTools.</li>
  <li>Unit Testing: All components have undergone individual testing with Jest.</li>
  <li>End-to-End Testing: Cypress has been used for e2e testing.</li>
</ul>


## To run this app:
<ol>
  <li>Clone the repository and open it in your preferred source code editor.</li>
  <li>Open your terminal and navigate to the project folder: cd zooSimulator/my-app</li>
  <li>Install the necessary dependencies: npm install</li>
  <li>Run the client application: npm start
</ol>
