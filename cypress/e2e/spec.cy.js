describe("ProfileInfo component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/users/662ac6643107cfece4945ed7");
  });

  it("should contain Trends for you", () => {
    cy.wait(5000);
    cy.contains("Trends for you").should("be.visible");
  });
});
