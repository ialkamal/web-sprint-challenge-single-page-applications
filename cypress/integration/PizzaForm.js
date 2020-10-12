describe("Form Test", () => {
  it("Validate form fields", () => {
    cy.visit("localhost:3000");
    cy.get("[data-cy=HMOButton]").click().url().should("include", "/pizza");
    cy.get("[data-cy=name]")
      .type("Ismail AlKamal")
      .should("have.value", "Ismail AlKamal");
    cy.get("[data-cy=pizzaSize]").select("Large").should("have.value", "Large");
    cy.get("[data-cy=dicedTomatoes]").check().should("be.checked");
    cy.get("[data-cy=sausage]").check().should("be.checked");
    cy.get("[data-cy=blackOlives]").check().should("be.checked");
    cy.get("[data-cy=special]")
      .type("Need it in 15 minutes")
      .should("have.value", "Need it in 15 minutes");
    cy.get("[data-cy=submit]").should("not.be.disabled").click();
  });
});
