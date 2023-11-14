describe("Various examples", () => {
	beforeEach(() => {
		cy.visit("/examples");
	});

	it("multi-page test", () => {
		cy.location("pathname").should("eq", "/examples");

		cy.getDataTest("nav-overview").click();
		cy.location("pathname").should("eq", "/overview");

		cy.getDataTest("nav-why-cypress").click();
		cy.location("pathname").should("eq", "/");

		cy.getDataTest("nav-fundamentals").click();
		cy.location("pathname").should("eq", "/fundamentals");

		cy.getDataTest("nav-forms").click();
		cy.location("pathname").should("eq", "/forms");

		cy.getDataTest("nav-component").click();
		cy.location("pathname").should("eq", "/component");

		cy.getDataTest("nav-best-practices").click();
		cy.location("pathname").should("eq", "/best-practices");
	});

	it("intercepts", () => {
		cy.intercept("POST", "http://localhost:3000/examples", {
			fixture: "example.json",
		}).as("postRequest");
		cy.getDataTest("post-button").click();
		cy.wait("@postRequest");
	});

	it("grudges", () => {
		cy.contains(/add some grudges/i);

		cy.getDataTest("grudge-list").within(() => {
			cy.get("li").should("have.length", 0);
		});

		cy.getDataTest("clear-button").should("not.exist");

		cy.getDataTest("grudge-list-title").should(
			"contain.text",
			"Add Some Grudges"
		);

		cy.getDataTest("grudge-input").within(() => {
			cy.get("input").type("hello");
		});
		cy.getDataTest("add-grudge-button").click();

		cy.getDataTest("grudge-list").within(() => {
			cy.get("li").should("have.length", 1);
			cy.get("li").its(0).should("contain.text", "hello");
		});

		cy.getDataTest("grudge-input").within(() => {
			cy.get("input").type("hello2");
		});
		cy.getDataTest("add-grudge-button").click();

		cy.getDataTest("grudge-list").within(() => {
			cy.get("li").should("have.length", 2);
			cy.get("li").its(1).should("contain.text", "hello2");
		});

		cy.getDataTest("grudge-list").within(() => {
			cy.get("li")
				.its(0)
				.within(() => {
					cy.get("button").click();
				});
		});

		cy.getDataTest("grudge-list").within(() => {
			cy.get("li").should("have.length", 1);
		});

		cy.getDataTest("clear-button").click();
		cy.getDataTest("grudge-list").within(() => {
			cy.get("li").should("have.length", 0);
		});
	});
});
