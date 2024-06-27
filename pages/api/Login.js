import { data } from "@/data";
import { withSession } from "@/session";

// export default async function handler(req, res){
//   const { username, password } = req.body;
//   // console.log(username);
//   // console.log(password);
//   const user = data.find((item) => item.username == username);
//   if (user && user.password == password) {
//     res.status(200).json({message:'user authenticated'})
//   }
//   else{
//     res.status(403).json({message:'username or password doesnt match'})
//   }
//   // res.status(200)
// }

const handler = async function (req, res) {
  const { username, password } = req.body;
  // console.log(userName, password);

  const user = data.find((item) => item.username == username);

  if (user && user.password == password) {
    req.session.set("user", user);   // key : value pair
    await req.session.save(); // Cookie will get created

    res.status(200).json({ message: "user authenticated" });
  } else {
    res.status(403).json({ message: "username or password is wrong" });
  }
};
export default withSession(handler);


//next.js provides capability of backend, when we write code in the api
//in api we can define multiple routes based on our convenience
//and when we make call to the api we can get back data
//so Nextjs is working as backend, so we can execute both forntend as well as backend