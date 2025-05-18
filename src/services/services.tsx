import { BlogI } from "../pages/blog/blogslice";
import { CategoryI } from "../pages/category/categoryslice";

export const postBlog = async ({
  body,
}: {
  body: BlogI;
}): Promise<BlogI | null> => {
  const baseUrl = "https://68272e2c6b7628c5290f58e2.mockapi.io/";
  const endpoints = "blog";

  try {
    const response = await fetch(`${baseUrl}${endpoints}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 201) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
  } catch (_) {
    return null;
  }
};

export const fetchBlog = async (): Promise<BlogI[] | string> => {
  const baseUrl = "https://68272e2c6b7628c5290f58e2.mockapi.io/";
  const endpoints = "blog";
  const url = `${baseUrl}${endpoints}`;
  try {
    const response = await fetch(url);

    if (response.status == 200) {
      const responseData = await response.json();
      return responseData;
    } else {
      return "Error from Server";
    }
  } catch (_) {
    return "SomeThing went Wrong";
  }
};

export const searchBlog = async ({
  search,
  type,
  filter,
}: {
  type: "search" | "filter";
  search?: string;
  filter?: {
    key: string;
    value: string;
  };
}): Promise<BlogI[] | null> => {
  const baseUrl = "https://68272e2c6b7628c5290f58e2.mockapi.io/";
  const slug =
    type == "search" ? `search=${search}` : `${filter?.key}=${filter?.value}`;
  const endpoints = `blog?${slug}`;
  const url = `${baseUrl}${endpoints}`;

  try {
    const response = await fetch(url);

    if (response.status == 200) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
  } catch (_) {
    return null;
  }
};

export const postCategory = async ({
  body,
}: {
  body: CategoryI;
}): Promise<CategoryI | null> => {
  const baseUrl = "https://68272e2c6b7628c5290f58e2.mockapi.io/";
  const endpoints = `category`;
  const url = `${baseUrl}${endpoints}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 201) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
  } catch (_) {
    return null;
  }
};

export const fetchCategory = async (): Promise<CategoryI[] | string> => {
  const baseUrl = "https://68272e2c6b7628c5290f58e2.mockapi.io/";
  const endpoints = `category`;
  const url = `${baseUrl}${endpoints}`;
  try {
    const response = await fetch(url);
    if (response.status == 200) {
      const responseData = await response.json();
      return responseData;
    } else {
      return "Error from Server";
    }
  } catch (_) {
    return "SomeThing went Wrong";
  }
};
