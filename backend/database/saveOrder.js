import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function saveRecordsInDatabase(pizzasize, pizzaflavour, pizzatopping, address) {
    try {
        const {data, error} = await supabase.rpc("saveorder", {pizzasize, pizzaflavour, pizzatopping, address});
        // const {data, error} = await supabase.rpc("saveOrder", [pizzaSize, pizzaFlavour, pizzaToppings, address]);

        if (error) {
            console.log(error);
            throw "Error!"
        }
    } catch(err) {
        console.log(err);
        throw "Could Not Save To Database";
    }
}