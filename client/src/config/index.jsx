import { AccessibilityIcon, Book, ChartLineIcon, DollarSign, HouseIcon, KanbanIcon, KeyRoundIcon, MenuSquareIcon, Package, SearchCheckIcon, ShapesIcon, ShoppingBag, ShoppingBagIcon, Users, WorkflowIcon } from "lucide-react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "books", label: "TextBooks" },
      { id: "electronics", label: "Electronics" },
      { id: "furniture", label: "Furniture" },
      { id: "accessories", label: "Accessories" },
      { id: "sports", label: "Sports" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "books",
    label: "TextBooks",
    path: "/shop/listing",
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/listing",
  },
  {
    id: "furniture",
    label: "Furniture",
    path: "/shop/listing",
  },
  {
    id: "sports",
    label: "Sports",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
    
];

export const shoppingViewHeaderMenuItem = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
    icon: <HouseIcon />
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
    icon: <ShoppingBag/>
  },
  {
    id: "books",
    label: "TextBooks",
    path: "/shop/listing",
      icon: <MenuSquareIcon/>
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/listing",
      icon: <WorkflowIcon/>
  },
  {
    id: "furniture",
    label: "Furniture",
    path: "/shop/listing",
      icon: <KanbanIcon/>
  },
  {
    id: "sports",
    label: "Sports",
    path: "/shop/listing",
      icon: <ShapesIcon/>
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
      icon: <AccessibilityIcon/>
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
      icon: <SearchCheckIcon/>
  },
    
];

export const categoryOptionsMap = {
  books: "TextBooks",
  electronics: "Electronics",
  furniture: "Furniture",
  accessories: "Accessories",
  sports: "Sports",
  men: "TextBooks",
  women: "Electronics",
  kids: "Furniture",
  footwear: "Sports",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "books", label: "TextBooks" },
    { id: "electronics", label: "Electronics" },
    { id: "furniture", label: "Furniture" },
    { id: "accessories", label: "Accessories" },
    { id: "sports", label: "Sports" },
  ],
  // brand: [
  //   { id: "nike", label: "Nike" },
  //   { id: "adidas", label: "Adidas" },
  //   { id: "puma", label: "Puma" },
  //   { id: "levi", label: "Levi's" },
  //   { id: "zara", label: "Zara" },
  //   { id: "h&m", label: "H&M" },
  // ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export  const stats = [
    {
      title: "Total Orders",
      value: "1,245",
      icon: <ShoppingBag className="h-6 w-6 text-indigo-600" />,
      color: "bg-indigo-100",
    },
    {
      title: "Total Customers",
      value: "980",
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Revenue",
      value: "$58,430",
      icon: <DollarSign className="h-6 w-6 text-yellow-600" />,
      color: "bg-yellow-100",
    },
    {
      title: "Products",
      value: "320",
      icon: <Package className="h-6 w-6 text-pink-600" />,
      color: "bg-pink-100",
    },
  ];


export const blogPosts = [
  {
    id: 1,
    title: "College Tips 2026",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Welcome to College Tips 2026 🎓 — your go-to platform for study hacks, career guidance, tech skills, and real college survival tips to help you stay ahead in 2026.",
  },
  {
    id: 2,
    title: "Textbooks Pics",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGV4dGJvb2tzfGVufDB8fDB8fHww",
    description:
      "Our editors’ favorite sneakers that will elevate your wardrobe. A perfect mix of comfort and street-style fashion.",
  },
  {
    id: 3,
    title: "Student’s Essentials",
    image:
      "https://wallpaperaccess.com/full/1448061.jpg",
    description:
      "Minimal, timeless, and versatile pieces every man should own. Build your capsule wardrobe with these essentials.",
  },
  {
    id: 4,
    title: "How to Start Freelancing as a College Student",
    image:
      "https://plus.unsplash.com/premium_photo-1661763119491-c0c6205a2163?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZWxhbmNlfGVufDB8fDB8fHww",
    description:
      "A beginner-friendly roadmap to start freelancing with zero experience and turn your skills into income.",
  },
    {
    id: 1,
    title: "Avoid These 7 Common Mistakes in College Life”",
    image:
      "https://plus.unsplash.com/premium_photo-1682126237121-905308172ca0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWlzdGFrZXxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Understand the biggest mistakes students make and how you can avoid them to stay ahead academically and professionally.",
  },
  {
    id: 2,
    title: "Complete Roadmap for Government Exam Preparation During College",
    image:
      "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJvYWRtYXB8ZW58MHx8MHx8fDA%3D",
    description:
      "Plan smartly for competitive exams while managing college studies without feeling overwhelmed."
  },
  {
    id: 3,
    title: "Best Free Online Platforms to Learn New Skills in 2026",
    image:
      "https://images.unsplash.com/photo-1508317469940-e3de49ba902e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2tpbGxzfGVufDB8fDB8fHww",
    description:
      "A curated list of trusted platforms where students can learn high-income skills without spending money."
  },
  {
    id: 4,
    title: "10 Smart Study Hacks Every College Student Should Know in 2026",
    image:
      "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFja3N8ZW58MHx8MHx8fDA%3D",
    description:
      "Discover practical and science-backed study techniques that improve focus, boost memory, and help you score better in exams without last-minute stress.",
  },
    {
    id: 1,
    title: "How to Balance College, Skills & Side Hustles",
    image:
     "https://img.freepik.com/premium-photo/professional-males-colleagues-hd-8k-wallpaper-stock-photographic-image_1033957-29162.jpg",
    description:
      "Learn how to manage your time effectively while handling classes, building skills, and even earning online without burnout.",
  },
  {
    id: 2,
    title: "Top In-Demand Skills Students Must Learn in 2026",
    image:
      "https://images.unsplash.com/photo-1529119513315-c7c361862fc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVtYW5kfGVufDB8fDB8fHww",
    description:
      "Explore the most valuable skills like coding, data analytics, communication, and AI tools that can boost your career opportunities.",
  },
  {
    id: 3,
    title: "Step-by-Step Guide to Crack College Placements",
    image:
      "https://plus.unsplash.com/premium_photo-1661783001655-46a02e887842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBsYWNlbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "From resume building to interview preparation, this guide covers everything you need to confidently face campus placements.",
  },
  {
    id: 4,
    title: "How to Start Freelancing as a College Student",
    image:
      "https://media.istockphoto.com/id/2172166252/photo/a-software-developer-is-thinking-on-improving-the-efficiency-of-the-ai-system.webp?a=1&b=1&s=612x612&w=0&k=20&c=GymN0pqomZ07Ewdm-fthiS_E9uc1ZohWFL71pk5sq4I=",
    description:
      "A beginner-friendly roadmap to start freelancing with zero experience and turn your skills into income.",
  },
];

 export const chartData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
];