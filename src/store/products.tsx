export type Product = {id:string; img: string; price: number,name:string,type:string,description:string} ;

export const initProducts: Product [] = [
{id: "1", name:"Café chico",img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",type:"bebida", price:900,description:"Café chico" },
{id: "11", name:"Café Mediano",img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",type:"bebida", price:1100,description:"Café mediano" },
{id: "12", name:"Café grande",img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",type:"bebida", price:1300,description:"Café chico" },
{id: "2",name:"Jorgito Blanco", img: "https://http2.mlstatic.com/D_NQ_NP_649853-MLA49251645780_032022-O.webp", price:700,type:"golosina",description:"Alfajor de chocolate blanco"},
{id: "3",name:"Jorgito Negro",img: "https://clickandfoods.com/cdn/shop/products/CRI04453_20fdf960-0dfc-438e-ac88-e13b54481699_1024x1024.jpg?v=1598728860", price:700,type:"golosina" ,description:"Alfajor de chocolate negro"},
{id: "4",name:"Pancho", img: "https://i.postimg.cc/PxskYXX2/pancho-el-barato.png", price:1200,type:"comida",description:"Con aderezo y/o papas" },
{id: "5",name:"Pebete JyQ", img: "https://i.postimg.cc/G3j1TnZx/pebete-elbarato.png", price:1500,type:"comida",description:"Pebete de jamon y queso" },
{id: "6",name:"Hamburguesa simple", img: "https://i.postimg.cc/5yfdKsFz/h-simple.png", price:2500,type:"comida",description:"Hamburguesa simple" },
{id: "7",name:"Hamburguesa con JyQ", img: "https://i.postimg.cc/tT3GzK7y/h-jamon-y-queso.png", price:3500,type:"comida",description:"Hamburguesa con jamon y queso" },
{id: "8",name:"Hamburguesa completa", img: "https://i.postimg.cc/cCTqpfQb/h-completa.png", price:4500,type:"comida",description:"Hamburguesa con jamon,queso,tomate y huevo" },
{id: "9",name:"Cheese Burguer", img: "https://i.postimg.cc/5tFVXYVX/h-cheese.png", price:4000,type:"comida",description:"Hamburguesa con queso cheddar y panceta" },
{id: "10",name:"Pizza individual", img: "https://i.postimg.cc/tCCGhmbQ/pizza.png", price:4000,type:"comida",description:"4 porciones de pizza" },
]