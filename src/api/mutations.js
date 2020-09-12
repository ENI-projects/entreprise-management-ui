export const mutations = {
  updateCompanyById: `mutation updateCompanyById ($id: Int!,$nom: String!,$adresse: String!,$ville: String!,$departement: String!,$code_postal: String!, $responsable: String!) {
    update_armadacar_entreprises(
      where: {id: {_eq: $id}}, 
      _set: {
        nom: $nom,
        adresse:$adresse,
        ville: $ville,
        departement: $departement,
        code_postal: $code_postal,
        responsable: $responsable
      }
    ) {
      returning {
        id
        nom
      }
    }
  }`,
  addCompany: `mutation addCompany($nom: String!, $adresse: String!, $ville: String!, $departement: String!, $code_postal: String!, $responsable: String!) {
    insert_armadacar_entreprises(objects: {
      nom: $nom,
      adresse: $adresse,
      ville: $ville,
      departement: $departement,
      code_postal: $code_postal,
      responsable: $responsable
    }
    ) {
      returning {
        id
        nom
      }
    }
  }`,
  deleteCompanyById: `mutation deleteCompanyById($id: Int!) {
    delete_armadacar_entreprises(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }`,
  deleteCompanyRelatedStuffById: `mutation deleteCompanyRelatedStuffById($id: Int!) {
    delete_armadacar_utilisateurs_courses(where: {course: {entreprise: {id: {_eq: $id}}}}) {
      affected_rows
    }
    delete_armadacar_courses(where: {entreprise: {id: {_eq: $id}}}) {
      affected_rows
    }
    delete_armadacar_voitures(where: {entreprise: {id: {_eq: $id}}}) {
      affected_rows
    }
    delete_armadacar_lieux_de_stockage(where: {entreprise: {id: {_eq: $id}}}) {
      affected_rows
    }
  }`
};
