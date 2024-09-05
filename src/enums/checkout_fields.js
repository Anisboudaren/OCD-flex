const WILAYAS =[
    "Adrar","Chlef","Laghouat",
    "Oum El Bouaghi","Batna","Béjaïa",
    "Biskra","Bechar","Blida","Bouïra",
    "Tamanrasset","Tébessa","Tlemcen",
    "Tiaret","Tizi Ouzou","Alger","Djelfa",
    "Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès",
    "Annaba","Guelma","Constantine","Médéa","Mostaganem",
    "M'Sila","Mascara","Ouargla","Oran","El bayadh","Illizi",
    "Bordj Bou Arréridj","Boumerdès","El Taref","Tindouf",
    "Tissemsilt","El Oued","Khenchela","Souk ahras","Tipaza",
    "Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa",
    "Relizane","Timimoun","Bordj Badji Mokhtar","Ouled Djellal",
    "Béni Abbès","In Salah","Ain Guezzam","Touggourt","Djanet",
    "El M'Ghair","El Menia"]

const checkout_fields = {
    "data": [
    {
        "custom": false,
        "name": "email",
        "display_name": "Email",
        "placeholder": "Email",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": false
    },
    {
        "custom": false,
        "name": "country",
        "display_name": "Country",
        "placeholder": "Country",
        "type": "text",
        "options": [],
        "required": false,
        "enabled": false
    },
    {
        "custom": false,
        "name": "phone_or_email",
        "display_name": "Phone or email",
        "placeholder": "Phone or email",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": false
    },
    {
        "custom": false,
        "name": "company",
        "display_name": "Company",
        "placeholder": "Company",
        "type": "text",
        "options": [],
        "required": false,
        "enabled": false
    },
    {
        "custom": false,
        "name": "first_name",
        "display_name": "First name",
        "placeholder": "First name",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": false
    },
    {
        "custom": false,
        "name": "region",
        "display_name": "Region",
        "placeholder": "Region",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": false
    },
    {
        "custom": false,
        "name": "city",
        "display_name": "City",
        "placeholder": "City",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": false
    },
    {
        "custom": false,
        "name": "password",
        "display_name": "Password",
        "placeholder": "Password",
        "type": "password",
        "options": [],
        "required": true,
        "enabled": true
    }
]
}

module.exports = {checkout_fields}