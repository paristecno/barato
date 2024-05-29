export type Product = {id:string; img: string; price: number,name:string,type:string,description:string} ;

export const initProducts: Product [] = [
{id: "1", name:"Café chico",img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",type:"bebida", price:900,description:"Café chico" },
{id: "11", name:"Café Mediano",img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",type:"bebida", price:1100,description:"Café mediano" },
{id: "12", name:"Café grande",img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",type:"bebida", price:1300,description:"Café chico" },
{id: "2",name:"alfajor", img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg", price:30,type:"golosina",description:"muy rico"},
{id: "3",name:"turron",img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg", price:40,type:"golosina" ,description:"muy rico"},
{id: "4",name:"Pancho", img: "./src/imgs/pancho-el-barato.png", price:1200,type:"comida",description:"Con aderezo y/o papas" },
{id: "5",name:"Pebete JyQ", img: "./src/imgs/pebete-elbarato.png", price:1500,type:"comida",description:"Pebete de jamon y queso" },
{id: "6",name:"Hamburguesa simple", img: "./src/imgs/h-simple.png", price:2500,type:"comida",description:"Hamburguesa simple" },
{id: "7",name:"Hamburguesa con JyQ", img: "./src/imgs/h-jamon-y-queso.png", price:3500,type:"comida",description:"Hamburguesa con jamon y queso" },
{id: "8",name:"Hamburguesa completa", img: "./src/imgs/h-completa.png", price:4500,type:"comida",description:"Hamburguesa con jamon,queso,tomate y huevo" },
{id: "9",name:"Cheese Burguer", img: "./src/imgs/h-cheese.png", price:4000,type:"comida",description:"Hamburguesa con queso cheddar y panceta" },
{id: "10",name:"Pizza individual", img: "./src/imgs/pizza.png", price:4000,type:"comida",description:"4 porciones de pizza" },
]