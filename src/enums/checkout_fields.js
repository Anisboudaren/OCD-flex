const checkout_fields = {
    "data": [
    {
        "custom": false,
        "name": "first_name",
        "display_name": "الإسم الكامل",
        "placeholder": "الإسم و اللقب",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": true
    },// name
      {
        "custom": false,
        "name": "phone",
        "display_name": "رقم الهاتف",
        "placeholder": "رقم الهاتف",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": true
    },//phone
    {
        "custom": true,
        "name": "wilayas",
        "display_name": "الولاية",
        "placeholder": "01 - أدرار",
        "type": "select",
        "options": [
            "01 - أدرار",
            "02 - الشلف",
            "03 - الأغواط",
            "04 - أم البواقي",
            "05 - باتنة",
            "06 - بجاية",
            "07 - بسكرة",
            "08 - بشار",
            "09 - البليدة",
            "10 - البويرة",
            "11 - تمنراست",
            "12 - تبسة",
            "13 - تلمسان",
            "14 - تيارت",
            "15 - تيزي وزو",
            "16 - الجزائر",
            "17 - الجلفة",
            "18 - جيجل",
            "19 - سطيف",
            "20 - سعيدة",
            "21 - سكيكدة",
            "22 - سيدي بلعباس",
            "23 - عنابة",
            "24 - قالمة",
            "25 - قسنطينة",
            "26 - المدية",
            "27 - مستغانم",
            "28 - المسيلة",
            "29 - معسكر",
            "30 - ورقلة",
            "31 - وهران",
            "32 - البيض",
            "33 - إليزي",
            "34 - برج بوعريريج",
            "35 - بومرداس",
            "36 - الطارف",
            "37 - تندوف",
            "38 - تيسمسيلت",
            "39 - الوادي",
            "40 - خنشلة",
            "41 - سوق أهراس",
            "42 - تيبازة",
            "43 - ميلة",
            "44 - عين الدفلى",
            "45 - النعامة",
            "46 - عين تموشنت",
            "47 - غرداية",
            "48 - غليزان",
            "49 - تيميمون",
            "50 - برج باجي مختار",
            "51 - أولاد جلال",
            "52 - بني عباس",
            "53 - عين صالح",
            "54 - عين قزام",
            "55 - تقرت",
            "56 - جانت",
            "57 - المغير",
            "58 - المنيعة"
        ] , 
        "required": true,
        "enabled": true
    },//wilayas
    {
        "custom": true,
        "name": "communes",
        "display_name": "البلدية",
        "placeholder": "اختر البلدية",
        "type": "text",
        "options": [],
        "required": true,
        "enabled": true
    },//communes
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