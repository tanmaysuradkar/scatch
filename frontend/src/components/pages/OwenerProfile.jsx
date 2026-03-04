import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import ProductCreate from "./CreateProduct";
import axios from "axios";

export default function OwenerProfile() {
  const [productData, setProductData] = useState({
    image: "",
    name: "",
    Categories: "",
    genStyles: "",
    price: "",
    discount: 0,
    color: "",
  });

  const [transactions, setTransactions] = useState([]);
  console.log(transactions)
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [activeTab, setActiveTab] = useState("transactions");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValues, setEditValues] = useState({});
  const [isEditingAccount, setIsEditingAccount] = useState(false);

  const [ownerProfile, setOwnerProfile] = useState({
    fullName: "Owner Name",
    email: "owner@email.com",
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setOwnerProfile((p) => ({ ...p, [name]: value }));
  };


  // Statuses should match backend values (capitalize)
  const statuses = ["Pending", "Paid", "Failed", "Refunded"];

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_backendURL}owners/transactions`);
      if (res.status === 200) {
        setTransactions(res.data.transactions || []);
      }
    } catch (err) {
      console.error("Failed to load transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (activeTab === "products") {
      fetchAllProducts();
    }
  }, [activeTab]);

  const fetchAllProducts = async () => {
    try {
      setProductsLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_backendURL}products/getProducts`, { isModeALL: "ALL" });
      if (res.status === 200) {
        setProducts(res.data.Product || []);
      }
    } catch (err) {
      console.error("Failed to load products", err);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleDeleteProduct = async (name, idx) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_backendURL}products/deleteProduct`, { name });
      if (res.status === 201) {
        const copy = [...products];
        copy.splice(idx, 1);
        setProducts(copy);
      }
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const startEdit = (idx) => {
    setEditIndex(idx);
    setEditValues({ ...products[idx] });
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditValues({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((p) => ({ ...p, [name]: value }));
  };

  const saveEdit = async (originalName, idx) => {
    try {
      const payload = {
        name: originalName,
        image: editValues.image,
        rename: editValues.name,
        Categories: editValues.dressStyles || editValues.Categories || editValues.Categories,
        price: editValues.price,
        discount: editValues.discount,
      };
      const res = await axios.post(`${import.meta.env.VITE_backendURL}products/updateProduct`, payload);
      if (res.status === 201) {
        // update local list
        const copy = [...products];
        copy[idx] = { ...copy[idx], ...editValues };
        setProducts(copy);
        cancelEdit();
      }
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  const updateStatus = async (idx, newStatus) => {
    try {
      const tx = transactions[idx];
      setUpdating(idx);
      const res = await axios.post(`${import.meta.env.VITE_backendURL}owners/updateStatus`, {
        paymentId: tx.paymentId,
        status: newStatus,
      });
      if (res.status === 200) {
        // reflect locally
        const copy = [...transactions];
        copy[idx] = { ...copy[idx], paymentStatus: res.data.payment.status };
        setTransactions(copy);
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="max-w-[100%] text-black mx-auto bg-gray-50 min-h-screen">
      <div className=" border-gray-200 relative flex items-center justify-center bg-white">
        <div className="h-20 w-full">
          <Header />
        </div>
      </div>

      <div className="lg:px-10 md:px-5 px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>
        <p className="text-sm text-gray-600 mb-6">Manage transactions,Product Manage, view product info and buyer email addresses.</p>

        <div className="bg-white rounded-lg shadow p-4 flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 border-r pr-4">
            <nav className="space-y-2">
              <button onClick={() => setActiveTab("transactions")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "transactions" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                Payment Transactions
              </button>
              <button onClick={() => setActiveTab("products")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "products" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                All Products
              </button>
              <button onClick={() => setActiveTab("create")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "create" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                Create Product
              </button>
              <button onClick={() => setActiveTab("account")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "account" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                Account
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === "transactions" && (
              <div className="bg-white rounded-lg shadow p-4">
                {loading ? (
                  <div className="text-center py-10">Loading transactions...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2">Product</th>
                          <th className="py-3 px-2">Qty</th>
                          <th className="py-3 px-2">Buyer Email</th>
                          <th className="py-3 px-2">Order Date</th>
                          <th className="py-3 px-2">Status</th>
                          <th className="py-3 px-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-6 text-center text-gray-500">No transactions found</td>
                          </tr>
                        )}
                        {transactions.map((t, idx) => (
                          <tr key={`${t.paymentId}-${t.product?._id || idx}`} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-2 flex items-center gap-3">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <img src={t.product?.image ? `../${t.product.image}` : "/api/placeholder/80/80"} alt={t.product?.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-semibold">{t.product?.name || "-"}</div>
                                <div className="text-sm text-gray-500">${t.product?.price || t.amount || "-"}</div>
                              </div>
                            </td>
                            <td className="py-4 px-2">{t.quantity}</td>
                            <td className="py-4 px-2">{t.userEmail}</td>
                            <td className="py-4 px-2">{t.orderDate ? new Date(t.orderDate).toLocaleString() : "-"}</td>
                            <td className="py-4 px-2">
                              <select
                                value={t.paymentStatus}
                                onChange={(e) => {
                                  const copy = [...transactions];
                                  copy[idx] = { ...copy[idx], paymentStatus: e.target.value };
                                  setTransactions(copy);
                                }}
                                className="border rounded px-3 py-2"
                              >
                                {statuses.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-4 px-2">
                              <button
                                onClick={() => updateStatus(idx, transactions[idx].paymentStatus)}
                                disabled={updating === idx}
                                className="px-3 py-2 bg-black text-white rounded hover:bg-gray-800"
                              >
                                {updating === idx ? "Updating..." : "Save"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "products" && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-3">All Products</h2>
                {productsLoading ? (
                  <div className="py-6 text-center">Loading products...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2">Image</th>
                          <th className="py-3 px-2">Name</th>
                          <th className="py-3 px-2">Category</th>
                          <th className="py-3 px-2">Price</th>
                          <th className="py-3 px-2">Discount</th>
                          <th className="py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-6 text-center text-gray-500">No products found</td>
                          </tr>
                        )}
                        {products.map((p, idx) => (
                          <tr key={p._id || idx} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-2 w-24">
                              <img src={p.image ? `../${p.image}` : "/api/placeholder/80/80"} alt={p.name} className="w-20 h-20 object-cover rounded" />
                            </td>
                            <td className="py-4 px-2">
                              {editIndex === idx ? (
                                <input name="name" value={editValues.name || ""} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" />
                              ) : (
                                <div className="font-medium">{p.name}</div>
                              )}
                            </td>
                            <td className="py-4 px-2">
                              {editIndex === idx ? (
                                <input name="dressStyles" value={editValues.dressStyles || editValues.Categories || ""} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" />
                              ) : (
                                <div>{p.dressStyles || p.Categories || "-"}</div>
                              )}
                            </td>
                            <td className="py-4 px-2">
                              {editIndex === idx ? (
                                <input name="price" value={editValues.price || ""} type="number" onChange={handleEditChange} className="border px-2 py-1 rounded w-24" />
                              ) : (
                                <div>${p.price}</div>
                              )}
                            </td>
                            <td className="py-4 px-2">
                              {editIndex === idx ? (
                                <input name="discount" value={editValues.discount || ""} type="number" onChange={handleEditChange} className="border px-2 py-1 rounded w-20" />
                              ) : (
                                <div>{p.discount || 0}%</div>
                              )}
                            </td>
                            <td className="py-4 px-2 flex items-center gap-2">
                              {editIndex === idx ? (
                                <>
                                  <button onClick={() => saveEdit(p.name, idx)} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                                  <button onClick={cancelEdit} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => startEdit(idx)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                                  <button onClick={() => handleDeleteProduct(p.name, idx)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "create" && (
              <ProductCreate />
            )}

            {activeTab === "account" && (
              <div className="p-4 ">
                <h2 className="text-xl font-semibold mb-3">Account</h2>
                <p className="text-gray-600">Owner account settings and profile information.</p>
                

                <div className="space-y-5 bg-white p-6 rounded-lg shadow">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      name="fullName"
                      value={ownerProfile.fullName}
                      onChange={handleAccountChange}
                      disabled={!isEditingAccount}
                      className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      name="email"
                      value={ownerProfile.email}
                      disabled
                      className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                  </div>
                </div>
                <div className="w-full p-6 max-w-3xl flex justify-between items-center mb-6">
                  {!isEditingAccount ? (
                    <button
                      onClick={() => setIsEditingAccount(true)}
                      className="px-4 text-center py-2 bg-black text-white rounded"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditingAccount(false)}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingAccount(false)}
                        className="px-4 py-2 bg-gray-200 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}