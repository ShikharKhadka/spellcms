import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { BlogI, fetch, filterStatus, search } from "./blogslice";
import useInput from "../../hooks/input";
import Dropdown from "../../component/dropdown/dropdown";
import { useNavigate } from "react-router";
import { fetch as categoryFetch } from "../category/categoryslice";

const Blog = () => {
  const state = useSelector((e: RootState) => e.blog.data);
  const status = useSelector((e: RootState) => e.blog.status);
  const error = useSelector((e: RootState) => e.blog.error);
  const categorystate = useSelector((e: RootState) => e.category.data);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const input = useInput<BlogI>();
  const [searchData, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetch());
    dispatch(categoryFetch());
  }, [dispatch]);
  const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(filterStatus({ key: "status", value: value.toLowerCase() }));
  };

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const category = categorystate.find((f) => f.id == e.target.value);
    console.log(value);
    if (category != null) {
      dispatch(filterStatus({ key: "category", value: category?.name ?? "" }));
    }
  };

  return (
    <div className="p-6 bg-gray-50 w-full min-h-screen">
      <div className="text-3xl font-bold text-gray-800 mb-6 ">Blog</div>
      <div className="mb-6">
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-5 py-2  rounded hover:bg-blue-700 transition">
            Add Blog
          </button>
          <input
            type="text"
            placeholder="Search blogs..."
            onChange={(e) => {
              dispatch(search(e.target.value));
            }}
            className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               placeholder-gray-400 "
          />
        </div>
        <div className="flex items-center mt-5 gap-4">
          <div>Filter</div>
          <Dropdown
            option={categorystate}
            defaultOption="Category"
            onchange={onCategoryChange}
            objectKey="id"
            objectValue="name"
          />

          {/* Category Filter */}
          <Dropdown
            option={["Draft", "Published"]}
            defaultOption="Status"
            onchange={onStatusChange}
          />
        </div>
        {/* Status Filter */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {status == "error" ? (
          <div>No Data Found</div>
        ) : (
          state.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {e.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Author:</span> {e.author}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Category:</span> {e.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-white text-xs ${
                      e.status === "published"
                        ? "bg-green-500"
                        : e.status === "draft"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {e.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tags:</span> {e.tags}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
