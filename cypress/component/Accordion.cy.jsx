const { default: ItemsAccordion } = require("@/app/components/Accordion");

const items = [
	{
		id: 1,
		summary: "Summary 1",
		details: "Details 1",
	},
	{
		id: 2,
		summary: "Summary 2",
		details: "Details 2",
	},
	{
		id: 3,
		summary: "Summary 3",
		details: "Details 3",
	},
];

describe("Accordion.cy.jsx", () => {
	it("should test Items Accordion", () => {
		cy.mount(<ItemsAccordion items={items} />);
		cy.getDataTest("accordion-wrapper").within(() => {
			cy.get('[data-test^="accordion-item"]').should("have.length", 3);
		});

		cy.contains(/Details 1/i).should("not.be.visible");
		cy.getDataTest("accordion-item-1").within(() => {
			cy.get('div[role="button"]').click();
		});
		cy.contains(/Details 1/i).should("be.visible");
		cy.getDataTest("accordion-item-1").within(() => {
			cy.get('div[role="button"]').click();
		});
		cy.contains(/Details 1/i).should("not.be.visible");
	});
});
