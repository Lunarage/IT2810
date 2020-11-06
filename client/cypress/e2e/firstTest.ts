describe("Visiting page", () => {
    it("Visits the page", () => {
        cy.visit("localhost:3000");

        cy.contains("Welcome!");
    });


});