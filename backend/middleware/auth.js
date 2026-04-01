import jwt from "jsonwebtoken"

 const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("DECODED:", decoded);

    req.user = decoded;    

    next();  
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role ||   req.user.role  !== "admin") {
    return res.status(403).json({message: "Access denied . Admin only"
  });
}console.log("USER IN isAdmin:", req.user);
next();
};

 



export {
  auth, 
  isAdmin 
}