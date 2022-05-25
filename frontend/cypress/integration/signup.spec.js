describe("Signup", () => {
  it("It render correctly.", () => {
    cy.visit("/signup")
    cy.get("[data-testid=signup-form]").should("be.visible")
  })
})
