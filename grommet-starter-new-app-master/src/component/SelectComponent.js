import {Box, Button, Form, FormField, Select, Text, TextInput} from "grommet";
import {alimente} from "./const";
import {useState} from "react";


function SelectComponent() {

    const [aliment, setAliment] = useState();
    const [total, setTotal] = useState(0);
    const [type, setType] = useState('g');
    function addAliment (option)  {
        setAliment(option);
        setType(option.type)
    }
    function onSubmit (value) {

        let calcul;
        if (aliment.type === 'g') {
            calcul = (aliment.calories * (value.name / 100));
        } else {
            calcul = aliment.calories;
        }
        setTotal(prevState => prevState + calcul);
    };
    return(
        <Box align={"center"} direction={"row"} gap={"medium"}>
            <Box>
               <Select options={alimente} placeholder={"Selecteaza aliment"} onChange={({ option }) => addAliment(option)}/>
            </Box>
            <Box>
                <Form
                    value={0}

                    onSubmit={({value}) => onSubmit(value)}
                >
                    <FormField name="name" htmlFor="text-input-id" label={type === 'g' ? 'Grame': 'Buc'}>
                        <TextInput id="text-input-id" name="name" />
                    </FormField>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Submit" />
                        {/*<Button type="reset" label="Reset" />*/}
                    </Box>
                </Form>
            </Box>
            <Box margin={{left: 'xlarge'}}>

                <Text>
                    Total calorii: {total}
                </Text>
            </Box>

        </Box>
    );
}
export default SelectComponent;