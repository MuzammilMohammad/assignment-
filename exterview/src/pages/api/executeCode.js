// src/pages/api/executeCode.js
import * as Babel from "@babel/standalone";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;

    try {
      // Transform and execute the JavaScript code safely
      const transformedCode = Babel.transform(code, { presets: ["env"] }).code;
      const result = eval(transformedCode); // Execute transformed code

      res.status(200).json({ output: result });
    } catch (err) {
      res.status(500).json({ output: `Error: ${err.message}` });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
