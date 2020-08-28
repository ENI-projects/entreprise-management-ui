export const queries = {
  getEntreprises: `query getEntreprises {
    armadacar_entreprises {
      nom
      id
    }
  }`,
  getEntrepriseById: `query getEntrepriseById ($id: Int!) {
    armadacar_entreprises(where: {id: {_eq: $id}}) {
      adresse
      code_postal
      id
      departement
      nom
      responsable
      ville
    }
  }`
};
