/// <reference types = 'cypress'/>

describe("API ", () => {
  beforeEach(() => {
    cy.viewport(1900, 1200);
  });

  it("GET page1 and page2", () => {
    // cy.visit("https://reqres.in/");
    // cy.get("#users").click();

    cy.api("GET", "https://reqres.in/api/users?page=1").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).length(6);
      console.log(res.body.data);

      let niz = res.body.data;

      for (var i = 0; i < niz.length; i++) {
        cy.log(res.body.data[i].first_name);
      }

      // cy.log(res.body.data[0].first_name);
      // cy.log(res.body.data[1].first_name);
      // cy.log(res.body.data[2].first_name);
      // cy.log(res.body.data[3].first_name);
      // cy.log(res.body.data[4].first_name);
      // cy.log(res.body.data[5].first_name);
    });
    cy.api("GET", "https://reqres.in/api/users?page=2", {
      fixture: "GET1.json",
    }).then((response) => {
      expect(response.status).eq(200);
      console.log(response);
      expect(response.body.data).length(6);

      let niz2 = response.body.data;
      for (var i = 0; i < niz2.length; i++) {
        cy.log(response.body.data[i].first_name);
      }
    });
  });

  it("GET single user", () => {
    cy.api("GET", "https://reqres.in/api/users/2").then((res) => {
      console.log(res);
      cy.log(res.body.data.first_name);
      expect(res.status).eq(200);
    });
  });

  it("Single user not found", () => {
    cy.api("GET", "https://reqres.in/api/users/23").then((responseUser) => {
      console.log(responseUser.body);
      expect(responseUser.status).to.eq(404);
    });
  });

  it("GET list resource", () => {
    cy.api("GET", "https://reqres.in/api/unknown").then((responsive) => {
      console.log(responsive);
      expect(responsive.status).to.eq(200);
      console.log(responsive.body.data);

      let datas = responsive.body.data;
      for (let i = 0; i < datas.length; i++) {
        cy.log(datas[i].name);
      }
    });
  });

  it("GET single resourse", () => {
    cy.api("GET", "https://reqres.in/api/unknown/2").then((resource) => {
      console.log(resource);
      expect(resource.status).to.eq(200);
      expect(resource.statusText).contain("OK");
      cy.log(resource.body.data.color);
      cy.log(resource.body.data.id);
      cy.log(resource.body.data.name);
      cy.log(resource.body.data.year);
    });
  });

  it("POST create", () => {
    cy.api("POST", "https://reqres.in/api/users", {
      name: "morpheus",
      job: "leader",
    }).then((resp) => {
      console.log(resp);
      cy.log(resp.body.name);
      cy.log(resp.body.job);
      expect(resp.status).eq(201);
      expect(resp.statusText).contain("Created");
    });
  });

  it("PUT update", () => {
    cy.api("GET", "https://reqres.in/api/users/2").then((responsive) => {
      console.log(responsive);
      expect(responsive.status).eq(200);
      cy.log(responsive.body.data.first_name);
      cy.log(responsive.body.data.id);
      cy.log(responsive.body.data.last_name);
    });

    cy.api("PUT", "https://reqres.in/api/users/2", {
      first_name: "morpheus",
      job: "zion resident",
      last_name: "matrix",
      id: 3,
    }).then((responsiveShould) => {
      console.log(responsiveShould);
      expect(responsiveShould.status).eq(200);
      expect(responsiveShould.body.first_name).contain("morpheus");
      expect(responsiveShould.body.last_name).contain("matrix");
      expect(responsiveShould.body.job).contain("zion resident");
      expect(responsiveShould.body.id).eq(3);
    });
  });

  it("PATCH -update", () => {
    cy.api("PATCH", "https://reqres.in/api/users/2", {
      name: "morpheus",
      job: "zion resident",
    });
  });

  it("DELETE -delete ", () => {
    cy.api("DELETE", "https://reqres.in/api/users/2").should((delStatus) => {
      expect(delStatus.status).to.eq(204);
    });
  });

  it("POST- register successful", () => {
    cy.api("POST", "https://reqres.in/api/register", {
      email: "eve.holt@reqres.in",
      password: "pistol",
    }).then((response) => {
      console.log(response);
      cy.log(response.body);
      expect(response.status).eq(200);
      expect(response.body.id).eq(4);
      expect(response.body.token).eq("QpwL5tke4Pnpja7X4");
    });
  });

  it("GET- Delayed response", () => {
    cy.api("GET", "https://reqres.in/api/users?delay=3").then((delayed) => {
      console.log(delayed);
      expect(delayed.status).eq(200);
      expect(delayed.body.data).length(6);

      for (let i = 0; i < delayed.body.data.length; i++) {
        cy.log(delayed.body.data[i].first_name);
        cy.log(delayed.body.data[i].last_name);
        cy.log("*********************************");
      }
    });
  });
});
