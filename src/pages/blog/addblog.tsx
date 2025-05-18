import { useEffect, useRef, useState } from "react";
import Button from "../../component/button/button";
import Textfiled from "../../component/textfiled";
import useInput from "../../hooks/input";
import { BlogI, post } from "./blogslice";
import Dropdown from "../../component/dropdown/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetch } from "../category/categoryslice";
import TextArea from "../../component/textarea/textarea";
import { postBlog } from "../../services/services";
import { useNavigate } from "react-router";

export const AddBlog = () => {
  const input = useInput<BlogI>();
  const [isOn, setIsOn] = useState(true);
  const [tags, setTag] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [fileList, setfileList] = useState<File[]>([]);
  const state = useSelector((e: RootState) => e.category.data);
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const today = new Date().toISOString();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<BlogI>({
    author: "",
    category: "",
    createdAt: "",
    status: "published",
    tags: [],
    title: "",
    body: "",
  });
  const handleRemove = (index: number) => {
    const tag = tags[index];
    const tagList = tags.filter((e) => e != tag);
    setTag(tagList);
  };

  const handelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setfileList([...fileList, e.target.files[0]]);
    }
  };

  const removeImage = (index: number) => {
    const image = fileList[index];
    const filterList = fileList.filter((e) => e != image);
    setfileList(filterList);
  };

  const onSubmit = async () => {
    const response = await postBlog({ body: blog });
    if (response != null) {
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  useEffect(() => {
    setBlog({ ...blog, createdAt: today });
  }, []);

  useEffect(() => {
    if (!blog.status) {
      setBlog({ ...blog, status: "draft" });
    }
  }, [blog.status]);

  return (
    <div  className="w-full">
      <form onSubmit={input.handleSubmit(onSubmit)}>
        <div className=" mx-auto p-6 rounded-xl space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Blog</h2>
          <div>
            <Textfiled
              input={input}
              onchange={(e) => {
                setBlog({ ...blog, title: e.target.value });
              }}
              placeholder="Title"
              required={true}
              validationName="title"
              value={blog.title}
            />
          </div>
          <TextArea
            input={input}
            onchange={(e) => {
              setBlog({ ...blog, body: e.target.value });
            }}
            placeholder="Body"
            validationName="body"
            value={blog.body}
          />
          <Textfiled
            input={input}
            onchange={(e) => {
              setBlog({ ...blog, author: e.target.value });
            }}
            placeholder="Author"
            required={true}
            validationName="author"
            value={blog.author}
          />
          <Dropdown
            input={input}
            defaultOption="Category"
            validationName="category"
            value={blog.category}
            onchange={(e) => {
              const category = state.find((f) => f.id == e.target.value);
              setBlog({ ...blog, category: category?.name ?? "" });
            }}
            option={state}
            objectKey="id"
            objectValue="name"
          />
          <div
            onClick={() => {
              setIsOn(!isOn);
            }}
            className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-200 ${isOn ? "bg-blue-500" : "bg-gray-300"
              }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow absolute top-0 transition-transform duration-300 ${isOn ? "translate-x-6" : "translate-x-0"
                }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              className="w-full md:w-30 px-4 py-2 rounded-lg border border-gray-300 shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               placeholder-gray-400 "
              placeholder=" Enter Tag"
              onChange={(e) => {
                const value = e.target.value;
                setTagInput(value);
              }}
              value={tagInput}
            />
            <span className="pl-2">
              <button
                type="button"
                onClick={() => {
                  setTag([...tags, tagInput]);
                  setTagInput("");
                  setBlog({ ...blog, tags: tags });
                }}
              >
                Add Tags
              </button>
            </span>
            <div className="flex flex-wrap gap-2 p-2">
              {tags.map((e, index) => (
                <div className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded flex items-center gap-2">
                  <span>{`#${e}`}</span>
                  <div
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-base leading-none"
                  >
                    ×
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button
            type="button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handelFileChange}
              />
              Upload Image
            </button>
            <div className="flex">
              {fileList.length > 0 &&
                fileList.map((e, index) => (
                  <div className="h-1/5 w-1/5 ">
                    <div className="flex justify-end">
                      <div
                        className="cursor-pointer"
                        onClick={() => removeImage(index)}
                      >
                        x
                      </div>
                    </div>
                    <img src={URL.createObjectURL(e)}></img>
                    <div>{e.name}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Button title="Post Blog" />
          </div>
        </div>
      </form>
    </div>

  );
};
