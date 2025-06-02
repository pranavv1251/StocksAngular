var Express = require("express");
var cors = require("cors");
const http = require("http");
const finnhub = require("finnhub");
const multer = require("multer");
const axios = require("axios");

// API_KEY_1 = 'cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g'
API_KEY_2 = "cnehfe9r01qq13fngln0cnehfe9r01qq13fnglng";

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = API_KEY_2; // Replace this
const finnhubClient = new finnhub.DefaultApi();

var app = Express();

app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://pranavvgangurde1251:Vilasrima%4022@cluster0.s8ru2un.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Success");
});

// app.listen(5038, "0.0.0.0", () => {
//   console.log("Success");
// });

// app.get("/", (req, response) => {

//   finnhubClient.companyProfile2(
//     { symbol: 'AAPL' },
//     (error, data, res) => {
//       response.json(data);
//     }
//   );
// });

app.get("/search", (req, response) => {
  finnhubClient.companyProfile2(
    { symbol: req.query.newSearch.toUpperCase() },
    (error, data, res) => {
      response.json(data);
    }
  );
});

app.get("/quote", (req, response) => {
  // finnhubClient.quote(
  //   req.body.newSearch.toUpperCase(),
  //   (error, data, res) => {
  //     console.log(data);
  //     response.json(data);
  //   }
  // );

  var url =
    "https://finnhub.io/api/v1/quote?token=cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g&symbol=" +
    req.query.newSearch.toUpperCase();
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        //  console.log('responsePranav',x['data']);
        response.json(x["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/autocomp", (req, response) => {
  var url =
    "https://finnhub.io/api/v1/search?token=cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g&q=" +
    req.query.autoText;
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x['data']);
        response.json(x["data"]["result"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/peers", (req, response) => {
  var url =
    "https://finnhub.io/api/v1/stock/peers?token=cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g&symbol=" +
    req.query.ticker.toUpperCase();
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x['data']);
        response.json(x["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/hourlyChart", (req, response) => {
  var url =
    "https://api.polygon.io/v2/aggs/ticker/" +
    req.query.ticker.toUpperCase() +
    "/range/1/hour/" +
    req.query.from +
    "/" +
    req.query.to +
    "?adjusted=true&sort=asc&apiKey=sTbdRKqF5gIhcnq3nA7RD7EkukyVntp2";
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x["data"]['results']);
        response.json(x["data"]["results"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/newsData", (req, response) => {
  var url =
    "https://finnhub.io/api/v1/company-news?symbol=" +
    req.query.ticker.toUpperCase() +
    "&from=" +
    req.query.from +
    "&to=" +
    req.query.to +
    "&token=cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g";
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x["data"]['results']);
        response.json(x["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/historical", (req, response) => {
  var url =
    "https://api.polygon.io/v2/aggs/ticker/" +
    req.query.ticker.toUpperCase() +
    "/range/1/day/" +
    req.query.from +
    "/" +
    req.query.to +
    "?adjusted=true&sort=asc&apiKey=h16WwbuWejZnBSWpvBpiuq0BASj6MnWm";
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x["data"]['results']);
        response.json(x["data"]["results"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/insider", (req, response) => {
  var url =
    "https://finnhub.io/api/v1/stock/insider-sentiment?from=2022-01-01&token=cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g&symbol=" +
    req.query.ticker.toUpperCase();
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x['data']);
        response.json(x["data"]["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/recommend", (req, response) => {
  var url =
    "https://finnhub.io/api/v1/stock/recommendation?&token=cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g&symbol=" +
    req.query.ticker.toUpperCase();
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x['data']);
        response.json(x["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

app.get("/earnings", (req, response) => {
  var url =
    "https://finnhub.io/api/v1/stock/earnings?&token=cmsv9v1r01qpvcpthj70cmsv9v1r01qpvcpthj7g&symbol=" +
    req.query.ticker.toUpperCase();
  const getBreeds = async () => {
    await axios
      .get(url)
      .then(function (x) {
        // // handle success
        // console.log('responsePranav',x['data']);
        response.json(x["data"]);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      })
      .finally(function () {
        // always executed
      });
  };
  getBreeds();
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/watchlist", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const haiku = database.collection("watchlist");
    // Create a document to insert
    const doc = {
      ticker: req.query.ticker,
      name: req.query.name,
      price: req.query.price,
      stockChange: req.query.stockChange,
      changePercent: req.query.changePercent,
    };
    const result = await haiku.insertOne(doc);

    // Print the ID of the inserted document

    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    const data = await database.collection("watchlist").find().toArray();
    // console.log(data);
    response.json(data);

    // response.json(data);
  };
  getBreeds();
});

app.get("/favorites", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const data = await database.collection("watchlist").find().toArray();
    // console.log(data);
    response.json(data);
  };
  getBreeds();
});

app.get("/removeWatchlist", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const haiku = database.collection("watchlist");
    const query = { ticker: req.query.ticker };

    const result = await haiku.deleteOne(query);

    // Print the ID of the inserted document

    // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // console.log(data);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    const data = await database.collection("watchlist").find().toArray();
    // console.log(data);
    response.json(data);

    // response.json(data);
  };
  getBreeds();
});

app.get("/portfolio", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const data = await database.collection("portfolio").find().toArray();
    // console.log(data);
    response.json(data);
  };
  getBreeds();
});

app.get("/addStock", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const coll = database.collection("portfolio");
    // Create a document to insert
    const doc = {
      name: req.query.name,
      ticker: req.query.ticker,
      quantity: req.query.quantity,
      buyingCost: req.query.buyingCost,
    };
    const result = await coll.insertOne(doc);

    // Print the ID of the inserted document

    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    const data = await database.collection("portfolio").find().toArray();
    // console.log(data);
    response.json(data);

    // response.json(data);
  };
  getBreeds();
});

app.get("/updateStock", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const coll = database.collection("portfolio");
    const filter = { ticker: req.query.ticker };
    // Create a document to insert
    const updateDoc = {
      $set: {
        quantity: req.query.quantity,
        buyingCost: req.query.buyingCost,
      },
    };
    const options = { upsert: true };
    const result = await coll.updateOne(filter, updateDoc, options);

    const data = await database.collection("portfolio").find().toArray();
    // console.log(data);
    response.json(data);

    // response.json(data);
  };
  getBreeds();
});

app.get("/sellStock", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");
    const coll = database.collection("portfolio");
    const filter = { ticker: req.query.ticker };
    // Create a document to insert
    const updateDoc = {
      $set: {
        quantity: req.query.quantity,
        buyingCost: req.query.buyingCost,
      },
    };
    const options = { upsert: true };
    const result = await coll.updateOne(filter, updateDoc, options);

    const data = await database.collection("portfolio").find().toArray();
    // console.log(data);
    response.json(data);

    // response.json(data);
  };
  getBreeds();
});

app.get("/deleteStock", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");
    const data = await database
      .collection("portfolio")
      .deleteOne({ ticker: req.query.ticker });
    response.json(data);
  };
  getBreeds();
});

app.get("/updateMoney", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const coll = database.collection("money");
    const filter = { update: "yes" };
    // Create a document to insert
    const updateDoc = {
      $set: {
        money: req.query.money,
      },
    };
    const options = { upsert: true };
    const result = await coll.updateOne(filter, updateDoc, options);

    const data = await database.collection("money").find().toArray();
    // console.log(data);
    response.json(data);

    // response.json(data);
  };
  getBreeds();
});


app.get("/getMon", (req, response) => {
  const getBreeds = async () => {
    const database = client.db("WebtechAss3");

    const data = await database.collection("money").find().toArray();
    // console.log(data);
    response.json(data);
  };
  getBreeds();
});
// let data = '';
// const request = http.request(options, (res) => {
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//       data += chunk;
//     });

//     res.on('end', () => {
//         console.log(data);
//         response.send(data)
//     });
// });

// request.on('error', (error) => {
//     console.error(error);
// });

// request.end();
