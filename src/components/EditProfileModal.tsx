
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Upload, X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
  };
  onSave: (data: { name: string; email: string; profileImage?: string }) => void;
}

const EditProfileModal = ({ isOpen, onClose, userData, onSave }: EditProfileModalProps) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ name, email, profileImage: profileImage || undefined });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-junina-yellow-400/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-junina-yellow-400 font-poetsen text-xl">
            Editar Perfil
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 bg-junina-yellow-400/20 rounded-full flex items-center justify-center mb-3 overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-junina-yellow-400" />
              )}
            </div>
            <label htmlFor="profile-upload" className="cursor-pointer">
              <Button variant="outline" className="border-junina-yellow-400 text-junina-yellow-400 hover:bg-junina-yellow-400 hover:text-junina-blue-900 font-poppins">
                <Upload className="w-4 h-4 mr-2" />
                Escolher Foto
              </Button>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div>
            <label className="text-white font-poppins block mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-junina-blue-800/50 border border-junina-yellow-400/20 text-white font-poppins focus:border-junina-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white font-poppins block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-junina-blue-800/50 border border-junina-yellow-400/20 text-white font-poppins focus:border-junina-yellow-400 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold font-poppins"
            >
              Salvar
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-junina-yellow-400/50 text-white hover:bg-junina-yellow-400/10 font-poppins"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
