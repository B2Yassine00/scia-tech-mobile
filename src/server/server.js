// Import required modules
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const usersFilePath = "../components/users.json";
const painFilePath = "../components/painSciatica.json";
const userInfoFilePath = "../components/userInfo.json";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);

let users = [];
try {
  const usersJson = fs.readFileSync(usersFilePath, "utf8");
  const usersData = JSON.parse(usersJson);
  users = usersData.Users;
} catch (error) {
  console.error("Error reading user data:", error);
}

let painReports = [];
try {
  const painJson = fs.readFileSync(painFilePath, "utf8");
  painReports = JSON.parse(painJson).SciaticaPain;
} catch (error) {
  console.error("Error reading pain reports:", error);
}

let userInfoData = [];
try {
  const userInfoJson = fs.readFileSync(userInfoFilePath, "utf8");
  userInfoData = JSON.parse(userInfoJson).UsersInfos;
} catch (error) {
  console.error("Error reading user info data:", error);
}

// Endpoint to report pain
app.post("/report-pain", (req, res) => {
  const { title, activity, date, time } = req.body;

  // Create a new report object
  const newReport = {
    title,
    activity,
    date,
    time,
  };

  // Add the new report to the array
  painReports.push(newReport);

  // Update the painSciatica.json file with the new data
  fs.writeFileSync(
    painFilePath,
    JSON.stringify({ SciaticaPain: painReports }, null, 2)
  );

  res.status(200).json({ message: "Pain report added successfully" });
});

// Endpoint to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    req.session.user = user;
    res.status(200).json({ message: "Logged in successfully" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Endpoint to handle user registration
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Check if the email is already registered
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    res.status(400).json({ message: "Email already registered" });
  } else {
    // Generate a unique user ID
    const newUserId = users.length + 1;

    // Create a new user object with additional information
    const newUser = {
      id: newUserId,
      email,
      password,
    };

    // Add the new user to the array
    users.push(newUser);

    // Update the users.json file with the new data
    const updatedUserData = { Users: users };
    fs.writeFileSync(usersFilePath, JSON.stringify(updatedUserData, null, 2));

    res.status(200).json({ message: "Registration successful" });
  }
});

// Endpoint to access a protected route
app.get("/protected-route", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: "Access granted to protected route" });
  } else {
    res.status(401).json({ message: "Access denied. Please log in." });
  }
});

app.get("/info", (req, res) => {
  if (req.session.user) {
    const userInfo = userInfoData.find(
      (info) => info.id === req.session.user.id
    );
    if (userInfo) {
      const { fullName, age, weight, height } = userInfo;
      res.status(200).json({ fullName, age, weight, height });
    } else {
      res.status(404).json({ message: "User information not found" });
    }
  } else {
    res.status(401).json({ message: "Access denied. Please log in." });
  }
});

app.post("/info", (req, res) => {
  const { fullName, height, weight, age, gender } = req.body;

  // Determine the next unique ID based on the current user info data
  const nextId =
    userInfoData.length > 0
      ? Math.max(...userInfoData.map((u) => u.id)) + 1
      : 1;

  // Create a new user information object with the next unique ID
  const newUserInfo = {
    id: nextId,
    fullName,
    height,
    weight,
    age,
    gender,
  };

  // Add the new user information to the array
  userInfoData.push(newUserInfo);

  // Update the userInfo.json file with the new data
  fs.writeFileSync(
    userInfoFilePath,
    JSON.stringify({ UsersInfos: userInfoData }, null, 2)
  );

  res.status(200).json({ message: "User information stored successfully" });
});

app.post("/update", (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Access denied. Please log in." });
    }

    const { fullName, height, weight, age, gender } = req.body;

    const userInfoIndex = userInfoData.findIndex(
      (info) => info.id === req.session.user.id
    );

    if (userInfoIndex !== -1) {
      // Update the user information
      userInfoData[userInfoIndex] = {
        id: req.session.user.id,
        fullName,
        height,
        weight,
        age,
        gender,
      };

      // Update the userInfo.json file with the new data
      fs.writeFileSync(
        userInfoFilePath,
        JSON.stringify({ UsersInfos: userInfoData }, null, 2)
      );

      return res
        .status(200)
        .json({ message: "User information updated successfully" });
    } else {
      return res.status(404).json({ message: "User information not found" });
    }
  } catch (error) {
    console.error("Error updating user information:", error);
    return res.status(500).json({
      message: "Internal server error while updating user information",
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
