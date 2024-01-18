describe('Ghost.org UI Interaction Suite', () => {
  it('Should find and interact with elements on the page', () => {
    // Navigate to https://ghost.org/ -> happens in the BeforeEach
    // Find the Resources menu item - Command in the commands.js file
    cy.findButtonByText('Resources').click({force: true});

    // Find the Start here section - Command in the commands.js file
    cy.findElementByText('Start here').click({force: true});

    // Search for “create new blog”
    cy.get('#search-input').click().type('create new blog');

    // Open the 10th result
    cy.get('.search-result-link').eq(9).click({force: true});

    // Scroll to the top of the page
    cy.scrollTo('top');

    // Open the “Pricing” section
    cy.findButtonByText('Pricing').click({force: true});

    // Change the “Based on an audience” slider to 20k members and verify that all the
    // prices have increased.
    // First check the initial price elements and assert the initial values - Command in the commands.js file
    cy.findPriceElement('starter').should('have.text', '9');
    cy.findPriceElement('creator').should('have.text', '25');
    cy.findPriceElement('team').should('have.text', '50');
    cy.findPriceElement('business').should('have.text', '199');

    // Change the “Based on an audience” slider to 20k members
    cy.get('#members').invoke('val', 8).trigger('input');
    cy.get('#members').invoke('trigger', 'input');

    // Wait for any potential animations or updates to complete
    cy.wait(1000);

    // Assert that the prices value has been changed
    cy.findPriceElement('starter').should('not.have.text', '9');
    cy.findPriceElement('creator').should('not.have.text', '25');
    cy.findPriceElement('team').should('not.have.text', '50');
    cy.findPriceElement('business').should('not.have.text', '199');
  });
});