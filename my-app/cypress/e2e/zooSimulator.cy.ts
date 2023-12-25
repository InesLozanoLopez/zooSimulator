import { slowCypressDown } from 'cypress-slow-down';
import 'cypress-wait-until';


describe('Zoo Simulator create a Zoo', () => {
    beforeEach(() => {
        slowCypressDown(50);
        cy.visit('http://localhost:3000/');
    });

    it('should display name error', () => {
        cy.get('form').should('be.visible');
        cy.get('input[id="zooName"]').should('exist');

        cy.get('input[id="zooName"]').type('78()iuhe');
        cy.get('button[aria-label="Create new zoo"]').click();
        cy.get('.Toastify__toast-body').should('have.text','Only letters and number allowed');
        cy.get('section[id="zoo"]').should('not.exist');

    });

    it('should navigate to zoo page on successful submission', () => {
        cy.get('form').should('be.visible');
        cy.get('input[id="zooName"]').should('exist');

        cy.get('input[id="zooName"]').type('InesLand');
        cy.get('button[aria-label="Create new zoo"]').click();

        cy.url().should('include', '/zoo');
    });
})

describe('Zoo Simulator e2e test', () => {
    beforeEach(() => {
        slowCypressDown(50);
        cy.visit('http://localhost:3000/');
        cy.get('input[id="zooName"]').type('InesLand');
        cy.get('button[aria-label="Create new zoo"]').click();
    });

    it('Zoo Simulator components visibles', () => {
        cy.get('section[id="zoo"]').should('exist');
        cy.get('h1.zoo-welcome').invoke('text', 'Welcome to InesLand');
        cy.get('div.zoo-buttons').should('be.visible');
        cy.get('div.zoo-animals-grid').should('be.visible');
        cy.get('div.zoo-otherInfo').should('be.visible');
    });

    it('Zoo Simulator feeding button working', () => {
        cy.get('img[aria-label="Give food to your animals"]').should('be.visible');
        cy.get('img[aria-label="Give food to your animals"]').click();
        cy.get('.Toastify__toast-body').should('have.text','Your animals have been feed :)');
        cy.get('.fallingLeaves', { timeout: 2000 }).should('exist');
        cy.get('.fallingLeaves').should('be.visible');
    });

    it('Zoo Simulator aging button and automatically working', () => {
        cy.clock();

        cy.get('img[aria-label="Make your zoo 1 hour older"]').should('be.visible');
        cy.get('div.zoo-age').should('have.text', 'Zoo age: 0 hour');
        cy.get('img[aria-label="Make your zoo 1 hour older"]').click();
        cy.get('div.zoo-age').should('have.text', 'Zoo age: 1 hour');

        cy.tick(3600000).wait(1000);
        cy.get('.Toastify__toast-body').should('have.text','Your Zoo is 1h older');
        cy.get('div.zoo-age').should('have.text', 'Zoo age: 2 hours');
        cy.clock().invoke('restore');
    });

    // This test does not always pass as the decrement of the health is a random number
    it('Zoo Simulator health information being updated', () => {
        cy.clock();
        cy.get('img[aria-label="Make your zoo 1 hour older"]').click();
        cy.get('img[aria-label="Make your zoo 1 hour older"]').click();
        cy.get('img[aria-label="Make your zoo 1 hour older"]').click();

        cy.tick(3600000).wait(1000);
        cy.get('.Toastify__toast-body').should('contain.text','Oh no, one of your animals passed away');
        cy.get('.Toastify__toast-body').should('contain.text','Becareful, one of your elephants cannot walk!');

        cy.get('.FaSquareFull').should('have.lengthOf.below', 5)
        cy.clock().invoke('restore');
    });


    it('Zoo Simulator all animals killed and starting again', () => {
        const areAnimalsIconsDisplayed = () => {
            return cy.get('.animalsCage-IconsContainer img').should('have.length.greaterThan', 0)
        };


        const clickButtonAndWait = () => {
            cy.wait(5000);
            cy.get('img[aria-label="Make your zoo 1 hour older"]').click();
        }

        for (let i=0; i<10; i++){
            clickButtonAndWait();
            if(!areAnimalsIconsDisplayed()){
                return;
            }
        }
        cy.get('.Toastify__toast-body').should('contain.text', 'You killed all your animals... Your zoo is closed!');

        cy.get('button.zoo-otherInfo-button').click();
        cy.url().should('http://localhost:3000/');

    });
})