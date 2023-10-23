import {PageInfo} from "./Interfaces";

import PagAbout from "../pages/About";
import PagHome from "../pages/Home";
import PagNewTool from "../pages/NewTool";
import PagContacts from "../pages/Contacts";
import PagOtherTool from "../pages/OtherTool";
import PagGenerateT from "../pages/GenerateTranslation";


const PagesComponents: React.FC[] = [];

PagesComponents.push(PagAbout);
PagesComponents.push(PagHome);


const AllPages: PageInfo[] = [];


let MainPages = new Map<number, string>();

let SubPages = new Map<string, number>();

MainPages.set(0, "App");
MainPages.set(1, "About");


SubPages.set("Home", 0);
SubPages.set("Generate translation", 0);
SubPages.set("New tool", 0);
SubPages.set("Some other tool", 0);


SubPages.set("About this app", 1);
SubPages.set("Contacts", 1);





  
//Pages

const IPageHome: PageInfo = {
    p_number: 1,
    p_section: "App",
    p_name: "Home",
    p_component: PagHome
};

const IPageAbout: PageInfo = {
    p_number: 1,
    p_section: "About",
    p_name: "About this app",
    p_component: PagAbout
};

const IPageContacts: PageInfo = {
    p_number: 1,
    p_section: "App",
    p_name: "Contacts",
    p_component: PagContacts
};


AllPages.push(IPageHome);
AllPages.push(IPageAbout);
AllPages.push(IPageContacts);

export {MainPages, SubPages, AllPages, PagesComponents};