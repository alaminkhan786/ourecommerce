import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Close as CloseIcon
} from '@mui/icons-material';

function Profile() {
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@audioecommerce.com',
    phone: '+1 (555) 123-4567',
    bio: 'E-commerce platform administrator with extensive experience in digital retail management.',
    profilePhoto: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // TODO: Implement actual profile update logic
    console.log('Profile updated:', profile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          profilePhoto: reader.result
        }));
        setOpenPhotoDialog(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfile(prev => ({
      ...prev,
      profilePhoto: null
    }));
    setOpenPhotoDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
        {!isEditing && (
          <IconButton 
            onClick={() => setIsEditing(true)}
            sx={{ ml: 2 }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative'
            }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  src={profile.profilePhoto}
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mb: 2,
                    bgcolor: 'primary.main' 
                  }}
                >
                  {!profile.profilePhoto && 
                    (profile.firstName[0] + profile.lastName[0])}
                </Avatar>
                {isEditing && (
                  <IconButton
                    color="primary"
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: -10,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                    onClick={() => setOpenPhotoDialog(true)}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h6">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Administrator
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Profile Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 2 }} />,
                      readOnly: !isEditing
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 2 }} />,
                      readOnly: !isEditing
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 2 }} />,
                      readOnly: !isEditing
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 2 }} />,
                      readOnly: !isEditing
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: !isEditing
                    }}
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveProfile}
                    >
                      Save Profile
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Profile Photo Upload Dialog */}
      <Dialog
        open={openPhotoDialog}
        onClose={() => setOpenPhotoDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Update Profile Photo
          <IconButton
            onClick={() => setOpenPhotoDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            py: 2
          }}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<PhotoCameraIcon />}
              onClick={() => fileInputRef.current.click()}
              sx={{ mb: 2 }}
            >
              Upload Photo
            </Button>
            {profile.profilePhoto && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CloseIcon />}
                onClick={handleRemovePhoto}
              >
                Remove Current Photo
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Profile;
