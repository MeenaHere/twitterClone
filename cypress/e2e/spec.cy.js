describe("ProfileInfo component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/users/66355470dd36b721249da823");
  });

  it("should contain Trends for you", () => {
    cy.wait(5000);
    cy.contains("Trends for you").should("be.visible");
  });

  it("should contain Followers", () => {
    cy.contains("Followers");
  });
  
  it("should show Meena in Followers list", () => {
    cy.contains("Followers").click(); 
    cy.contains("Meena");
  });

  it("should contain Following", () => {
    cy.contains("Following");
  });

  it("should contain Home", () => {
    cy.contains("Home");
  });

  it("should navigate to Home page", () => {
    cy.contains("Home").click(); 
  });

});
