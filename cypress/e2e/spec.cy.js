describe("ProfileInfo component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/users/66355470dd36b721249da823");
  });

  it("should contain Trends for you", () => {
    cy.wait(5000);
    cy.contains("Trends for you").should("be.visible");
  });
});
