import { getAllPrograms } from "../lib/data"; 
import fs from "fs";
 
 const data = getAllPrograms(); 
 
 console.log("TOTAL PROGRAMS:", data.length); 
 
 fs.writeFileSync( 
   "debug_merged_data.json", 
   JSON.stringify(data, null, 2) 
 ); 
