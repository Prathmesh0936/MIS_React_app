import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/GroupManagement.css';

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchGroups = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/groups');
      setGroups(Array.isArray(res.data) ? res.data : res.data.groups || []);
    } catch (err) {
      console.error('Error fetching groups:', err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      if (editId !== null) {
        await axios.put(`http://localhost:8080/api/groups/${editId}`, {
          groupName,
        });
        setEditId(null);
      } else {
        await axios.post('http://localhost:8080/api/groups', {
          groupName,
        });
      }
      setGroupName('');
      fetchGroups();
    } catch (err) {
      console.error('Error saving group:', err);
    }
  };

  const handleEdit = (group) => {
    setGroupName(group.groupName);
    setEditId(group.groupId);
  };

  const handleDelete = async (groupId) => {
    try {
      await axios.delete(`http://localhost:8080/api/groups/${groupId}`);
      fetchGroups();
    } catch (err) {
      console.error('Error deleting group:', err);
    }
  };

  return (
    <div className="group-container">
      <div className="group-card">
        <h4>Total Groups</h4>
        <p>{groups.length}</p>
      </div>

      <div className="group-form">
        <input
          type="text"
          placeholder="Enter Unique Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editId !== null ? 'Update Group' : 'Add Group'}
        </button>
      </div>

      <table className="group-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Group Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <tr key={group.groupId}>
                <td>{index + 1}</td>
                <td>{group.groupName}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(group)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(group.groupId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No groups found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupManagement;
