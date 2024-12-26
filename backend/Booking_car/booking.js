import connectToDatabase from "../database.js";

export default async function addUser({ name, number, PickUp, Where_to_go }) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("Book_car");

    // Generate a new user ID
    const lastUser = await collection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    const userId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;

    const newUser = {
      id: userId,
      name,
      number,
      PickUp,
      Where_to_go,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    // Insert the new user into the collection
    const result = await collection.insertOne(newUser);

    // Return the result of the insertion
    return {
      success: true,
      message: "User  added successfully",
      userId: result.insertedId, // Return the inserted ID
    };
  } catch (error) {
    console.error("There is a problem in adding user:", error);
    return {
      success: false,
      message: "Failed to add user",
    };
  }
}
