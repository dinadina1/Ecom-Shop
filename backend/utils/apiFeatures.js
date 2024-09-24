class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let keyword = this.queryStr.keyword
      ? {
          $or: [
            {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              category: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    // Conditionally remove 'keyword' if 'category' exists in query
    if (queryStrCopy.category) {
      delete queryStrCopy.keyword;
    }

    // Removing fields that are not part of filtering
    const removeFields = ["limit", "page"];
    removeFields.forEach((field) => delete queryStrCopy[field]);

    // Converting query operators like gt, gte, lt, lte to MongoDB format
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // Applying the filter to the query
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
