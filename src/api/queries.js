export const queries = {
  getEntreprises: `query getEntreprises {
    armadacar_entreprises {
      nom
      id
      responsable
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
  }`,
  getUsersIdByIdEntreprise: `query getUsersIdByIdEntreprise($id: Int!) {
    armadacar_utilisateurs(where: {entreprise: {id: {_eq: $id}}}) {
      id
    }
  }`
};
