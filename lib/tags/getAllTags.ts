
import listTags from "./listTags";

export const getAllTags = async () => {

    const tagTypes:any = ["sales_order",
    "item",
    "customer",
    "company",
    "purchase_order"]

    const allTags: any = {}

    for (let i = 0 ; i < tagTypes.length ; i++) {
        console.log(i);
        const res = await listTags(tagTypes[i]);
        allTags[tagTypes[i]] = res;
    }

    return allTags;

    //console.log(allTags);

    // const jsonString = JSON.stringify(allTags);
    // fs.writeFile('tags.json', jsonString, (err:any) => { 
    //     if (err) { 
    //         console.log('Error writing file', err) 
    //     } else { 
    //         console.log('Successfully wrote file') 
    //     } 
    // });
}

