import {Box, Button, Form, FormField, Select, Text, TextInput} from "grommet";
import {alimente} from "./const";
import {useState} from "react";


function SelectComponent() {

    const [aliment, setAliment] = useState();
    const [total, setTotal] = useState(0);
    const [type, setType] = useState('g');
    const [options, setOptions] = useState(alimente);
    function addAliment (option)  {
        setAliment(option);
        setType(option.type)
    }
    function onSubmit (value) {

        let calcul;
        if (aliment.type === 'g') {
            calcul = (aliment.calories * (value.name / 100));
        } else {
            if (value.name > 15) {
                calcul = 0;
            } else {
                calcul = aliment.calories * value.name;
            }

        }
        setTotal(prevState => prevState + calcul);
    }

    function resetTotal() {
      setTotal(0);
    };
    return(
        <Box align={"center"} direction={"row"} gap={"medium"}>
            <Box>
               <Select options={options} placeholder={"Selecteaza aliment"} onChange={({ option }) => addAliment(option)}
                       onSearch={(text) => {
                           // The line below escapes regular expression special characters:
                           // [ \ ^ $ . | ? * + ( )
                           const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

                           // Create the regular expression with modified value which
                           // handles escaping special characters. Without escaping special
                           // characters, errors will appear in the console
                           const exp = new RegExp(escapedText, 'i');
                           setOptions(alimente.filter((o) => exp.test(o)));
                       }}

               />
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

                <Text weight={"bold"}>
                    Total calorii: {total}
                </Text>
            </Box>
            <Box>
                <Button danger label={'Delete total number'} onClick={resetTotal}/>

            </Box>

        </Box>
    );
}
export default SelectComponent;