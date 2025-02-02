// GroupMembership.jsx
import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const WishlistSchema = Yup.object().shape({
  wishlist: Yup.string()
    .required('Wishlist is required')
    .matches(
      /^(\s*\d+\s*(,\s*\d+\s*)*)?$/,
      'Enter valid comma-separated numbers'
    ),
});

const GroupMembership = ({
  groups,
  userId,
  selectedGroupId,
  setSelectedGroupId,
  
}) => {
  // Handler for joining a group via dedicated endpoint
  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/users/${userId}/groups/${selectedGroupId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (res.ok) {
        alert('Joined group successfully.We shall update you via your Email on Further information');
        
      } else {
        const errorData = await res.json();
        alert(
          'Error joining group: ' + (errorData.error || 'Unknown error')
        );
      }
    } catch (err) {
      alert('Error joining group: ' + err.message);
    }
  };

  // Handler for leaving a group via dedicated endpoint
  const handleLeaveGroup = async () => {
    try {
      const res = await fetch(
        `/api/users/${userId}/groups/${selectedGroupId}`,
        {
          method: 'DELETE',
        }
      );
      if (res.ok) {
        alert('Left group successfully.');
       
      } else {
        const errorData = await res.json();
        alert(
          'Error leaving group: ' + (errorData.error || 'Unknown error')
        );
      }
    } catch (err) {
      alert('Error leaving group: ' + err.message);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Manage Your Group Membership</Card.Header>
      <Card.Body>
        {/* Join Group Form */}
        <Form onSubmit={handleJoinGroup}>
          <Form.Group controlId="groupSelect">
            <Form.Label>Select Group to Join:</Form.Label>
            <Form.Control
              as="select"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Join Group
          </Button>
        </Form>
        <Button
          variant="danger"
          onClick={handleLeaveGroup}
          className="mt-3"
        >
          Leave Selected Group
        </Button>
        <hr />
        <h5 className="mt-3">Update Wishlist</h5>
        <Formik
          initialValues={{ wishlist: '' }}
          validationSchema={WishlistSchema}
          onSubmit={async (values, { resetForm }) => {
            const wishlistArray = values.wishlist
              .split(',')
              .map((id) => parseInt(id.trim(), 10))
              .filter((id) => !isNaN(id));
            try {
              const res = await fetch(`/api/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wishlist: wishlistArray }),
              });
              if (res.ok) {
                alert('Wishlist updated.');
                resetForm();
              } else {
                const errorData = await res.json();
                alert(
                  'Error updating wishlist: ' +
                    (errorData.error || 'Unknown error')
                );
              }
            } catch (err) {
              alert('Error updating wishlist: ' + err.message);
            }
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <Form.Group controlId="wishlistInput">
                <Form.Label>
                  Wishlist (comma-separated Group IDs):
                </Form.Label>
                <Field
                  type="text"
                  name="wishlist"
                  as={Form.Control}
                  placeholder="e.g., 1,2"
                />
                <div className="text-danger">
                  <ErrorMessage name="wishlist" />
                </div>
              </Form.Group>
              <Button
                variant="secondary"
                type="submit"
                className="mt-2"
                disabled={isSubmitting}
              >
                Update Wishlist
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default GroupMembership;
