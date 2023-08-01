export const verifyAdmin = (req, res, next) => {
    const username = req.user;
    const usertype = req.usertype;
    const id = req.id;

    if(usertype !== "admin"){
        return res.status(403).send({ message: "invalid credentials" });
    }
    next();
};