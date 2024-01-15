import { download } from "../assets";
import { downloadImage } from "../utils";

export const handleDelete = async (_id,setAllPosts) => {
  try {
    const response = await fetch(`https://ai-pic-project.onrender.com/api/v1/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();
    
    if(response.ok) {
      console.log(data);
      setAllPosts((prevPosts) => prevPosts.filter(post => post._id !== _id));
    } else {
      console.error(data);
    }
  } catch (error) {
    alert(error);
    console.log('Error:', error);
  }
};

const Card = ({ _id, name, prompt, photo,allPosts,setAllPosts }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:show-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-md overflow-y-auto">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
          <button 
            type="button"
            className="bg-black text-white border-white border-2 rounded-md px-2 py-2"
            onClick={() => handleDelete(_id,setAllPosts)}
          >Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
