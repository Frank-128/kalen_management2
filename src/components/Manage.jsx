import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  TableContainer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../UserContext";
import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowUpward,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Manage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [staff_id, setStaff_id] = useState("");
  const [role, setRole] = useState("manager");
  const [gender, setGender] = useState("male");
  const [del, setDel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataTableUsers, setDatabaseUsers] = useState({});
  const [queryValues, setQueryValues] = useState({
    sortQuery: true,
    searchQuery: "",
    filterQuery: "",
    amountQuery: 3,
  });
  const [searchData, setSearchData] = useState("");
  const { handleCreate, handleDelete, handleUpdate } = useAppContext();
  const { users } = useAppContext();
  const navigate = useNavigate();

  const handleStaffDelete = (staffId) => {
    setDel(true);
    setSelectedUser(staffId);
  };

  function FormatedDate({ timeGiven }) {
    if (timeGiven == null) {
      return <span>null</span>;
    }
    const dateObject = new Date(timeGiven?.seconds * 1000);

    const year = dateObject.getFullYear().toString();
    const month = (dateObject.getMonth() + 1).toString();
    const day = dateObject.getDate().toString();
    const hours = dateObject.getHours().toString();
    const minutes = dateObject.getMinutes().toString();
    const seconds = dateObject.getSeconds().toString();

    return (
      <span>
        {year +
          "-" +
          month +
          "-" +
          day +
          "\t" +
          "\t" +
          hours +
          "-" +
          minutes +
          "-" +
          seconds}
      </span>
    );
  }

  const filteredValue = queryValues.sortQuery
    ? users
        .filter((item) =>
          item.name
            .toLowerCase()
            ?.includes(queryValues.searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          if (
            queryValues.filterQuery == "name" ||
            queryValues.filterQuery == "role"
          ) {
            if (
              a[queryValues.filterQuery].toUpperCase() <
              b[queryValues.filterQuery].toUpperCase()
            ) {
              return -1;
            }
            if (
              a[queryValues.filterQuery].toUpperCase() >
              b[queryValues.filterQuery].toUpperCase()
            ) {
              return 1;
            }
            return 0;
          } else {
        
            return a[queryValues?.filterQuery] - b[queryValues?.filterQuery];
          }
        })
        .slice(0, queryValues.amountQuery)
    : users
        .filter((item) =>
          item.name
            .toLowerCase()
            ?.includes(queryValues.searchQuery.toLowerCase())
        )
        .sort((b, a) => {
          if (
            queryValues.filterQuery == "name" ||
            queryValues.filterQuery == "role"
          ) {
            if (
              a[queryValues.filterQuery].toUpperCase() <
              b[queryValues.filterQuery].toUpperCase()
            ) {
              return -1;
            }
            if (
              a[queryValues.filterQuery].toUpperCase() >
              b[queryValues.filterQuery].toUpperCase()
            ) {
              return 1;
            } else {
              return 0;
            }
          } else {
            

            return a[queryValues?.filterQuery] - b[queryValues?.filterQuery];
          }
        })
        .slice(0, queryValues.amountQuery);

  return (
    <div className="md:w-full w-screen justify-center flex flex-col">
      <div className="bg-slate-300 p-3 w-full items-center justify-between flex">
        <span className="md:text-2xl  text-small  font-bold">Manage staff</span>
        
      </div>
      <div className="p-3 flex justify-between">
        <span>
          Show{" "}
          <select
            onChange={(e) =>
              setQueryValues({ ...queryValues, amountQuery: e.target.value })
            }
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </select>{" "}
          entries
        </span>
        <span className="flex items-center justify-center">
          <input
            type="text"
            onChange={(e) =>
              setQueryValues({ ...queryValues, searchQuery: e.target.value })
            }
            className="outline-none p-1 gap-3"
          />
          <button>
            <Search />
          </button>
        </span>
      </div>
     <TableContainer component="div" className="w-3/4">
     <Table  >
        <TableHead>
          <TableRow className="bg-slate-200">
            <TableCell>S.No</TableCell>

            <TableCell
              className="cursor-pointer group flex"
              onClick={(e) =>
                setQueryValues({
                  ...queryValues,
                  filterQuery: "name",
                  sortQuery: !queryValues.sortQuery,
                })
              }
            >
              <div className="flex">
                <span> Staff</span>{" "}
                <span className="group-hover:block hidden">
                  {queryValues.sortQuery ? <ArrowDropUp /> : <ArrowDropDown />}
                </span>
              </div>
            </TableCell>
            <TableCell
              className="cursor-pointer group md:flex hidden"
              onClick={(e) =>
                setQueryValues({
                  ...queryValues,
                  filterQuery: "phoneNumber",
                  sortQuery: !queryValues.sortQuery,
                })
              }
            >
              <div className="flex">
                <span> PhoneNumber</span>{" "}
                <span className="group-hover:block hidden">
                  {queryValues.sortQuery ? <ArrowDropUp /> : <ArrowDropDown />}
                </span>
              </div>
            </TableCell>
            <TableCell
              className="cursor-pointer group hidden md:block "
              onClick={(e) =>
                setQueryValues({
                  ...queryValues,
                  filterQuery: "role",
                  sortQuery: !queryValues.sortQuery,
                })
              }
            >
              <div className="flex">
                <span> Role</span>{" "}
                <span className="group-hover:block hidden">
                  {queryValues.sortQuery ? <ArrowDropUp /> : <ArrowDropDown />}
                </span>
              </div>
            </TableCell>
            <TableCell
              className="cursor-pointer group hidden md:flex "
              onClick={(e) =>
                setQueryValues({
                  ...queryValues,
                  filterQuery: "createdAt",
                  sortQuery: !queryValues.sortQuery,
                })
              }
            >
              <div className="flex">
                <span> createdAt</span>{" "}
                <span className="group-hover:block hidden">
                  {queryValues.sortQuery ? <ArrowDropUp /> : <ArrowDropDown />}
                </span>
              </div>
            </TableCell>
            <TableCell className="cursor-pointer group md:flex hidden">
              <div
                onClick={(e) =>
                  setQueryValues({
                    ...queryValues,
                    filterQuery: "email",
                    sortQuery: !queryValues.sortQuery,
                  })
                }
                className="flex w-full h-full"
              >
                email{" "}
                <span className="group-hover:block hidden">
                  {queryValues.sortQuery ? <ArrowDropUp /> : <ArrowDropDown />}
                </span>
              </div>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredValue.map((item, sn) => (
            <TableRow key={sn}>
              <TableCell className="p-4 border-b-2">{sn + 1}</TableCell>
              <TableCell onClick={()=>navigate('/profile/'+item.id)} className="p-4 cursor-pointer  border-b-2">{item.name}</TableCell>
              <TableCell className="p-4 border-b-2 md:block hidden">
                {item.phoneNumber}
              </TableCell>
              <TableCell className="p-4 border-b-2 md:block hidden">{item.role}</TableCell>

              <TableCell className="p-4 border-b-2 md:block hidden">
                <FormatedDate timeGiven={item.createdAt} />
              </TableCell>
              <TableCell className="p-4 border-b-2 md:block hidden">{item.email}</TableCell>

              <TableCell className="p-4  border-b-2">
                <div className="flex">
                  <button
                    className="bg-blue-500 rounded text-slate-200 p-2"
                    onClick={() => {
                      setEditOpen(true);
                      setEditedUser(item);
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    className="bg-red-500 rounded text-slate-200 ml-2 p-2"
                    onClick={() => handleStaffDelete(item.id, item.userId)}
                  >
                    DELETE
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>
      {/* Add user modal */}
      <Modal
        className="w-fullh-full flex items-center justify-center"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form className="bg-slate-400 p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder={"name"}
              onChange={(e) => setName(e.target.value)}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="staff_id">
              Staff Id
            </label>
            <input
              type="number"
              id="staff_id"
              value={staff_id}
              placeholder={"staff_id"}
              onChange={(e) => setStaff_id(e.target.value)}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              placeholder={"role"}
              onChange={(e) => setRole(e.target.value)}
              className="p-1"
            >
              <option value="manager">Manager</option>
              <option value="digital marketing">Digital Marketing</option>
              <option value="developers">Developers</option>
            </select>
          </div>
          <div>
            <span className="font-bold">Gender</span>
            <div className="flex gap-10">
              <div>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={gender == "male"}
                  onChange={() => setGender("male")}
                  value="male"
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="fename"
                  name="gender"
                  checked={gender == "female"}
                  onChange={() => setGender("female")}
                  value="female"
                />
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              handleCreate({ name, role, gender });
              setName("");

              setRole("");
              setIsOpen(false);
            }}
          >
            Add user
          </Button>
        </form>
      </Modal>
      {/* Edit modal */}
      <Modal
        className="w-full h-full flex items-center justify-center"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <form className="bg-slate-400 p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser((prev) => ({ ...prev, name: e.target.value }))
              }
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser((prev) => ({ ...prev, email: e.target.value }))
              }
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={editedUser.address}
              onChange={(e) =>
                setEditedUser((prev) => ({ ...prev, address: e.target.value }))
              }
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={(e) =>
                setEditedUser((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              onChange={(e) =>
                setEditedUser((prev) => ({ ...prev, role: e.target.value }))
              }
              className="p-1"
            >
              <option selected={editedUser.role == "manager"} value="manager">
                Manager
              </option>
              <option
                selected={editedUser.role == "digital marketing director"}
                value="digital marketing director"
              >
                Digital Marketing
              </option>
              <option
                selected={editedUser.role == "developer"}
                value="developers"
              >
                Developers
              </option>
            </select>
          </div>
          <div>
            <span className="font-bold">Gender</span>
            <div className="flex gap-10">
              <div>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={editedUser.gender == "male"}
                  onChange={() =>
                    setEditedUser((prev) => ({ ...prev, gender: "male" }))
                  }
                  value="male"
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="fename"
                  name="gender"
                  checked={editedUser.gender == "female"}
                  onChange={() =>
                    setEditedUser((prev) => ({ ...prev, gender: "female" }))
                  }
                  value="female"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={editedUser.bio}
              onChange={(e) =>
                setEditedUser((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="p-1"
            />
          </div>
          <Button
            onClick={() => {
              
              handleUpdate(editedUser);
              setEditOpen(false);
            }}
          >
            Edit user
          </Button>
        </form>
      </Modal>
      <Modal
        className="w-fullh-full flex items-center justify-center"
        open={del}
        onClose={() => setDel(false)}
      >
        <form className="bg-slate-400 p-4 flex flex-col gap-3">
          <div>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex gap-20">
              <Button
                onClick={() => {
                  if (selectedUser !== null) {
                    handleDelete(selectedUser);
                    setDel(false);
                  } else {
                    alert("no user chosen");
                  }
                }}
              >
                Yes
              </Button>
              <Button onClick={() => setDel(false)} color="error">
                No!
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Manage;
