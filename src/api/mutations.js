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
        adresse
        code_postal
        departement
        id
        nom
        responsable
        ville
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
      }
    }
  }`
};
