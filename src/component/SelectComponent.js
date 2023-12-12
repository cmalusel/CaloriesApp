import {Box, Button, Form, FormField, Select, Text, TextInput} from "grommet";
import {alimente} from "./const";
import {useEffect, useState} from "react";


function SelectComponent() {

    const [aliment, setAliment] = useState();
    const [total, setTotal] = useState(0);
    const [type, setType] = useState('g');
    const [options, setOptions] = useState(alimente);

    useEffect(() => {
       if (isNaN(localStorage.getItem('total'))) {
           localStorage.setItem('total', 0);
       } else {
           setTotal(localStorage.getItem('total'));
       }
    }, []);
    function addAliment (option)  {
        setAliment(option);
        setType(option.type)
    }
    function onSubmit (value) {

        let calcul;
        if (aliment.type === 'g') {
            calcul = (aliment.calories * (parseInt(value.name) / 100));
        } else {
            if (value.name > 15) {
                calcul = 0;
            } else {
                calcul = aliment.calories * parseInt(value.name);
            }

        }
        setTotal(prevState => {

            const newTotal = prevState + calcul;
            localStorage.clear();
            localStorage.setItem('total', parseInt(newTotal));
            return newTotal;});
    }

    function resetTotal() {
        localStorage.clear();
      setTotal(0);
    }

    function onSubmitTotal({name}) {
        if (name === undefined) {
            localStorage.setItem('total', 0);

        } else {
            localStorage.setItem('total', parseInt(name));
        }
        setTotal(parseInt(name));
    }
    return(
            <Box direction={"column"} align={"center"}>
                <Box align={"center"} direction={"row"} gap={"medium"} alignContent={"center"}>
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
                                <Button type="submit" primary label="Add" />
                                {/*<Button type="reset" label="Reset" />*/}
                            </Box>
                        </Form>
                    </Box>
                    <Box margin={{left: 'xlarge'}}>

                        <Text weight={"bold"}>
                            Total calorii: {total}
                        </Text>
                    </Box>


                </Box>
                <Box margin={{top: 'xlarge'}}>
                    <Button danger label={'Delete total number'} onClick={resetTotal}/>

                </Box>
                <Box margin={{top: "large"}}>

                    <Text weight={"bold"}>Set total manually:</Text>
                    <Form
                        value={0}

                        onSubmit={({value}) => onSubmitTotal(value)}
                    >
                        <FormField name="name" htmlFor="text-input-id" >
                            <TextInput id="text-input-id" name="name" />
                        </FormField>
                        <Box direction="row" gap="medium" align={"center"}>
                            <Button type="submit" primary label="Set total" alignSelf={"center"}/>
                        </Box>
                    </Form>
                </Box>
        </Box>

    );
}
export default SelectComponent;