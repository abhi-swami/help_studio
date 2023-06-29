const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
 
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/convert", async (req, res) => {
  const { language, code } = req.body;
  console.log(req.body)
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert the following ${code} into ${language} programming language `,
      max_tokens: 7,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text)
    res.status(200).send({ mesg: response.data.choices[0].text });
  } catch (error) {
    res.status(400).send({ mesg: error.message });
  }
});
app.post("/debuge", async (req, res) => {
  const { language, code } = req.body;
  console.log(req.body)
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Debug the following ${code} of ${language} programming language ,including all the variable declaration and syntext`,
      max_tokens: 7,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text)
    res.status(200).send({ mesg: response.data.choices[0].text });
  } catch (error) {
    res.status(400).send({ mesg: error.message });
  }
});
app.post("/qualityCheck", async (req, res) => {
  const { language, code } = req.body;
  console.log(req.body)
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Can you please check the quality ot  the following code ${code} of ${language} programming language and,how much % the given code is correct and how we can impore the quality of given code and you have give the entire code by fixing all variable names decleration,syntext and indentation`,
      max_tokens: 7,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text)
    res.status(200).send({ mesg: response.data.choices[0].text });
  } catch (error) {
    res.status(400).send({ mesg: error.message });
  }
});

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server running on port ${process.env.PORT_NUMBER}`);
});
