import React, { useState, useEffect } from 'react';
import {
  Home, Building2, Users, Package, DollarSign, Clock,
  Settings, LogOut, Menu, X, Phone, Mail, MapPin, Star,
  CheckCircle, Eye, Plus, Search, Filter, Download, Edit, Trash2
} from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal-related state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Sample data
  const [employees, setEmployeesState] = useState([
    { id: 1, name: 'Rajesh Kumar', role: 'admin', email: 'rajesh@bcsr.in', phone: '+91 9876543210' },
    { id: 2, name: 'Priya Sharma', role: 'supervisor', email: 'priya@bcsr.in', phone: '+91 9876543211' },
    { id: 3, name: 'Amit Singh', role: 'worker', email: 'amit@bcsr.in', phone: '+91 9876543212' }
  ]);

  const [inventory, setInventoryState] = useState([
    { id: 1, name: 'Cement Bags', quantity: 150, unit: 'bags', cost: 450, supplier: 'ABC Cement Ltd' },
    { id: 2, name: 'Steel Rods', quantity: 75, unit: 'tons', cost: 65000, supplier: 'Steel India Corp' },
    { id: 3, name: 'Concrete Mixer', quantity: 2, unit: 'units', cost: 125000, supplier: 'Equipment Rental' }
  ]);

  const [transactions, setTransactionsState] = useState([
    { id: 1, type: 'income', amount: 500000, description: 'Project Payment - Site A', date: '2024-05-20' },
    { id: 2, type: 'expense', amount: 85000, description: 'Material Purchase', date: '2024-05-19' },
    { id: 3, type: 'expense', amount: 45000, description: 'Labor Payment', date: '2024-05-18' }
  ]);

  const projects = [
    {
      id: 1,
      name: "Residential Complex - Phase I",
      location: "Gurgaon, Haryana",
      progress: 75,
      status: "On Track",
      color: "from-emerald-500 to-emerald-600",
      icon: Building2
    },
    {
      id: 2,
      name: "Commercial Tower",
      location: "Noida, UP",
      progress: 45,
      status: "In Progress",
      color: "from-blue-500 to-blue-600",
      icon: Building2
    },
    {
      id: 3,
      name: "Highway Bridge",
      location: "Delhi NCR",
      progress: 90,
      status: "Near Completion",
      color: "from-purple-500 to-purple-600",
      icon: Settings
    },
    {
      id: 4,
      name: "Shopping Mall Construction",
      location: "Mumbai, Maharashtra",
      progress: 60,
      status: "On Schedule",
      color: "from-orange-500 to-orange-600",
      icon: Building2
    },
    {
      id: 5,
      name: "Industrial Warehouse",
      location: "Pune, Maharashtra",
      progress: 85,
      status: "Finishing Phase",
      color: "from-indigo-500 to-indigo-600",
      icon: Package
    },
    {
      id: 6,
      name: "Hospital Complex",
      location: "Bangalore, Karnataka",
      progress: 30,
      status: "Foundation Complete",
      color: "from-red-500 to-red-600",
      icon: Building2
    }
  ];

  // Company Logo Component
  const CompanyLogo = ({ size = "default" }) => {
    const sizeClasses = {
      small: "w-8 h-8",
      default: "w-10 h-10", 
      large: "w-16 h-16",
      xl: "w-24 h-24"
    };

    // Use your professional logo image
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <img 
          src="/bcsr-logo.png" 
          alt="BCSR Projects Logo"
          className={`${sizeClasses[size]} object-contain drop-shadow-lg`}
          onError={(e) => {
            // Fallback to icon if image doesn't load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback icon (hidden by default) */}
        <div 
          className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}
          style={{display: 'none'}}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/30 rounded-full"></div>
          <Building2 className={`${size === 'small' ? 'h-4 w-4' : size === 'default' ? 'h-6 w-6' : size === 'large' ? 'h-10 w-10' : 'h-16 w-16'} text-white relative z-10`} />
          {size !== "small" && (
            <>
              <div className="absolute bottom-1 right-2 w-1 h-2 bg-yellow-400 opacity-60"></div>
              <div className="absolute top-2 left-1 w-1 h-1 bg-white/40 rounded-full"></div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Modal control functions
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  // Event Handlers
  const handleAddItem = (type) => {
    if (type === 'inventory item') {
      openModal('add_inventory');
    } else if (type === 'transaction') {
      openModal('add_transaction');
    } else if (type === 'employee') {
      openModal('add_employee');
    } else if (type === 'attendance') {
      openModal('add_attendance');
    } else {
      alert(`Add ${type} functionality will be implemented here.`);
    }
  };

  const handleEditItem = (type, item) => {
    openModal(`edit_${type.replace(/\s+/g, '_')}`, item);
  };

  const handleDeleteItem = (type, item) => {
    if (window.confirm(`Are you sure you want to delete this ${type} named "${item.name || item.description}"?`)) {
      alert(`${type} deleted successfully! (This is a demo, data not actually changed)`);
    }
  };

  const handleQuoteRequest = () => {
    openModal('quote_request');
  };

  const handleViewWork = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Scrolling to About section...');
    }
  };

  const handleClockAction = (action) => {
    const time = new Date().toLocaleTimeString();
    alert(`Successfully clocked ${action} at ${time}`);
  };

  const handleLogin = (email, password) => {
    const employee = employees.find(emp => emp.email === email);
    if (employee && password === 'password123') {
      setUser(employee);
      setCurrentView('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    setSidebarOpen(false);
  };

  // Modal Component
  const Modal = () => {
    const [formData, setFormData] = useState({});
    
    if (!showModal) return null;

    let title = 'Modal';
    if (modalType === 'add_inventory') title = 'Add New Inventory Item';
    else if (modalType === 'add_transaction') title = 'Add New Transaction';
    else if (modalType === 'add_employee') title = 'Add New Employee';
    else if (modalType === 'add_attendance') title = 'Add Attendance Record';
    else if (modalType === 'quote_request') title = 'Request Free Quote';
    else if (modalType.startsWith('edit_') && editingItem) {
      const itemType = modalType.replace('edit_', '').replace('_', ' ');
      title = `Edit ${itemType}: ${editingItem.name || editingItem.description || 'Item'}`;
    }

    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
      if (modalType === 'add_inventory') {
        const newItem = {
          id: inventory.length + 1,
          name: formData.name || '',
          quantity: parseInt(formData.quantity) || 0,
          unit: formData.unit || 'units',
          cost: parseInt(formData.cost) || 0,
          supplier: formData.supplier || ''
        };
        setInventoryState(prev => [...prev, newItem]);
        alert('Inventory item added successfully!');
      } else if (modalType === 'add_employee') {
        const newEmployee = {
          id: employees.length + 1,
          name: formData.name || '',
          role: formData.role || 'worker',
          email: formData.email || '',
          phone: formData.phone || ''
        };
        setEmployeesState(prev => [...prev, newEmployee]);
        alert('Employee added successfully!');
      } else if (modalType === 'add_transaction') {
        const newTransaction = {
          id: transactions.length + 1,
          type: formData.type || 'expense',
          amount: parseInt(formData.amount) || 0,
          description: formData.description || '',
          date: formData.date || new Date().toISOString().split('T')[0]
        };
        setTransactionsState(prev => [...prev, newTransaction]);
        alert('Transaction added successfully!');
      } else if (modalType === 'add_attendance') {
        alert(`Attendance record added for ${formData.employee} on ${formData.date}`);
      } else if (modalType === 'quote_request') {
        alert(`Thank you ${formData.name}! Your quote request for "${formData.projectType}" has been submitted. Our team will contact you at ${formData.phone} within 24 hours.`);
      } else {
        alert('Changes saved successfully!');
      }
      
      setFormData({});
      closeModal();
    };

    const renderFormFields = () => {
      if (modalType === 'add_inventory') {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter item name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <input
                  type="number"
                  value={formData.quantity || ''}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                <select
                  value={formData.unit || 'units'}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="units">Units</option>
                  <option value="bags">Bags</option>
                  <option value="tons">Tons</option>
                  <option value="kg">Kg</option>
                  <option value="liters">Liters</option>
                  <option value="meters">Meters</option>
                  <option value="pieces">Pieces</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost (₹) *</label>
              <input
                type="number"
                value={formData.cost || ''}
                onChange={(e) => handleInputChange('cost', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
              <input
                type="text"
                value={formData.supplier || ''}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter supplier name"
                required
              />
            </div>
          </div>
        );
      }

      if (modalType === 'add_employee') {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select
                value={formData.role || 'worker'}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="worker">Worker</option>
                <option value="supervisor">Supervisor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="employee@bcsr.in"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 9876543210"
                required
              />
            </div>
          </div>
        );
      }

      if (modalType === 'add_transaction') {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type *</label>
              <select
                value={formData.type || 'expense'}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹) *</label>
              <input
                type="number"
                value={formData.amount || ''}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter transaction description"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        );
      }

      if (modalType === 'quote_request') {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
              <select
                value={formData.projectType || ''}
                onChange={(e) => handleInputChange('projectType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Project Type</option>
                <option value="Residential Construction">Residential Construction</option>
                <option value="Commercial Building">Commercial Building</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Industrial Construction">Industrial Construction</option>
                <option value="Renovation">Renovation</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Location *</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, State"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
              <textarea
                value={formData.details || ''}
                onChange={(e) => handleInputChange('details', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe your project requirements"
                rows="4"
              />
            </div>
          </div>
        );
      }

      if (modalType === 'add_attendance') {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
              <select
                value={formData.employee || ''}
                onChange={(e) => handleInputChange('employee', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name} - {emp.role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check In *</label>
                <input
                  type="time"
                  value={formData.checkin || '09:00'}
                  onChange={(e) => handleInputChange('checkin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                <input
                  type="time"
                  value={formData.checkout || '18:00'}
                  onChange={(e) => handleInputChange('checkout', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <p className="text-gray-600">Form fields for {modalType}</p>
        </div>
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {renderFormFields()}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-xl fixed w-full top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CompanyLogo size="default" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                BCSR Projects
              </h1>
              <p className="text-xs text-gray-500 font-medium">Private Limited</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </nav>
          <button
            onClick={() => setCurrentView('login')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg"
          >
            Employee Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-br from-blue-50 via-white to-gray-100 relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
                🏗️ Leading Construction Company in India
              </div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Building Dreams,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Creating Reality
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                BCSR Project Private Limited - Your trusted partner in construction excellence across India.
                From residential complexes to commercial towers, we build with precision and passion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleQuoteRequest}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                >
                  Get Free Quote
                </button>
                <button
                  onClick={handleViewWork}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium"
                >
                  View Our Work
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-slate-800 via-gray-700 to-slate-900 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative z-10 text-white text-center">
                  <CompanyLogo size="xl" />
                  <h3 className="text-2xl font-bold mb-2 mt-4">Live Construction Site</h3>
                  <p className="text-lg opacity-90">Modern Residential Complex</p>
                </div>
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <p className="text-sm font-medium">Live Project: Residential Complex</p>
                  <p className="text-xs opacity-90">Gurgaon, Haryana • 75% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Project Gallery</h3>
            <p className="text-xl opacity-90">Visual showcase of our construction excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, color: "from-blue-500 to-blue-600", label: "Residential", emoji: "🏠" },
              { icon: Settings, color: "from-purple-500 to-purple-600", label: "Commercial", emoji: "🏢" },
              { icon: Package, color: "from-green-500 to-green-600", label: "Infrastructure", emoji: "🌉" },
              { icon: Users, color: "from-orange-500 to-orange-600", label: "Industrial", emoji: "🏭" },
              { icon: Building2, color: "from-red-500 to-red-600", label: "Healthcare", emoji: "🏥" },
              { icon: Settings, color: "from-indigo-500 to-indigo-600", label: "Education", emoji: "🎓" },
              { icon: Package, color: "from-yellow-500 to-yellow-600", label: "Retail", emoji: "🛍️" },
              { icon: Building2, color: "from-pink-500 to-pink-600", label: "Mixed Use", emoji: "🏘️" }
            ].map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl aspect-square">
                <div className={`w-full h-full bg-gradient-to-br ${item.color} flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-110 relative`}>
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <item.icon className="h-12 w-12 text-white/90 mb-2" />
                  <div className="text-white text-sm font-bold opacity-90">{item.label}</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h3>
            <p className="text-xl text-gray-600">Trusted by leading businesses across India</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Arvind Properties", location: "Mumbai", testimonial: "BCSR delivered our residential complex ahead of schedule with exceptional quality. Highly recommended!", rating: 5, initials: "AP", color: "from-blue-500 to-blue-600" },
              { name: "Tech Solutions Ltd", location: "Bangalore", testimonial: "Professional team, transparent pricing, and outstanding results. Our new office building exceeded expectations.", rating: 5, initials: "TS", color: "from-green-500 to-green-600" },
              { name: "Retail Chain India", location: "Delhi", testimonial: "Completed 5 mall projects with BCSR. Their attention to detail and timely delivery is unmatched.", rating: 5, initials: "RC", color: "from-purple-500 to-purple-600" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm mr-4 shadow-md`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => ( <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" /> ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive construction solutions for all your building needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Residential Construction", description: "Custom homes, apartments, and residential complexes built to perfection", color: "from-green-500 to-green-600" },
              { icon: Users, title: "Commercial Projects", description: "Office buildings, retail spaces, and commercial complexes", color: "from-blue-500 to-blue-600" },
              { icon: Settings, title: "Infrastructure", description: "Roads, bridges, and public infrastructure development", color: "from-purple-500 to-purple-600" }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className={`relative h-48 bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                  <service.icon className="h-16 w-16 text-white/80" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">About BCSR Projects</h3>
              <p className="text-lg text-gray-600 mb-6">With over 15 years of experience in the construction industry, BCSR Project Private Limited has established itself as a leading construction company in India. We specialize in delivering high-quality construction projects on time and within budget.</p>
              <p className="text-lg text-gray-600 mb-8">Our commitment to excellence, innovative construction techniques, and customer satisfaction has made us the preferred choice for residential, commercial, and infrastructure projects across major Indian cities.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                  <div className="text-gray-600">Expert Team</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-gray-600">Cities Served</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 rounded-xl shadow-lg flex items-center justify-center relative">
                <div className="text-center">
                  <Users className="h-24 w-24 text-gray-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Our Expert Team</h4>
                  <p className="text-gray-600">Building Excellence Together</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-10 w-10 text-yellow-700 mx-auto mb-2" />
                    <div className="text-yellow-800 text-sm font-bold">Equipment</div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-br from-orange-100 to-orange-300 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-10 w-10 text-orange-700 mx-auto mb-2" />
                    <div className="text-orange-800 text-sm font-bold">Materials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leadership Team */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-12">
              <h4 className="text-3xl font-bold text-gray-800 mb-4">Our Leadership Team</h4>
              <p className="text-lg text-gray-600">Meet the experts behind BCSR's success</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Rajesh Kumar", position: "Managing Director", experience: "20+ Years", initials: "RK", color: "from-blue-500 to-blue-600" },
                { name: "Priya Sharma", position: "Project Director", experience: "15+ Years", initials: "PS", color: "from-pink-500 to-pink-600" },
                { name: "Amit Singh", position: "Chief Engineer", experience: "18+ Years", initials: "AS", color: "from-green-500 to-green-600" }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className={`w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>{member.initials}</div>
                  <h5 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h5>
                  <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                  <p className="text-gray-500 text-sm">{member.experience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Get In Touch</h3>
            <p className="text-xl opacity-90">Ready to start your next construction project?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Call Us</h4>
              <p>+91 11 4567 8900</p>
              <p>+91 98765 43210</p>
            </div>
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Email Us</h4>
              <p>info@bcsrprojects.in</p>
              <p>projects@bcsrprojects.in</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
              <p>123 Construction Plaza</p>
              <p>New Delhi, India 110001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CompanyLogo size="default" />
                <h4 className="text-xl font-bold">BCSR Projects</h4>
              </div>
              <p className="text-gray-400">Building excellence across India with quality, innovation, and reliability.</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Residential Construction</li>
                <li>Commercial Projects</li>
                <li>Infrastructure Development</li>
                <li>Project Management</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BCSR Project Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Login Page Component
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
      const success = handleLogin(email, password);
      if (!success) {
        setError('Invalid credentials. Try: rajesh@bcsr.in / password123');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <CompanyLogo size="large" />
              <h2 className="text-3xl font-bold text-gray-900">BCSR Projects</h2>
            </div>
            <h3 className="text-center text-2xl font-bold text-gray-900">Employee Login</h3>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your project management dashboard
            </p>
          </div>
          <div className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="your.email@bcsr.in" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Password" />
            </div>
            <div>
              <button onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign In</button>
            </div>
            <div className="text-center">
              <button onClick={() => setCurrentView('landing')} className="text-blue-600 hover:text-blue-700 text-sm">← Back to Homepage</button>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: rajesh@bcsr.in</p>
            <p className="text-xs text-gray-500">Password: password123</p>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Components
  const Sidebar = () => {
    const menuItems = [
      { icon: Home, label: 'Dashboard', view: 'dashboard' },
      { icon: Package, label: 'Inventory', view: 'inventory' },
      { icon: DollarSign, label: 'Transactions', view: 'transactions' },
      { icon: Clock, label: 'Attendance', view: 'attendance' },
      ...(user?.role === 'admin' ? [{ icon: Users, label: 'Users', view: 'users' }] : [])
    ];

    return (
      <div className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white w-64 min-h-screen fixed left-0 top-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 shadow-2xl`}>
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-8">
            <CompanyLogo size="default" />
            <div>
              <h2 className="text-xl font-bold">BCSR Dashboard</h2>
              <p className="text-xs text-gray-400">Management Portal</p>
            </div>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button 
                key={item.view} 
                onClick={() => {setCurrentView(item.view); setSidebarOpen(false);}} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentView === item.view 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                    : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-xl mb-4">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-600 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  };

  const DashboardHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-md hover:bg-gray-100">{sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{currentView}</h1>
        </div>
        <div className="flex items-center space-x-4"><span className="text-sm text-gray-600">Welcome, {user?.name}</span></div>
      </div>
    </header>
  );

  const Dashboard = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Total Projects</p><p className="text-3xl font-bold text-gray-900">12</p></div><Building2 className="h-8 w-8 text-blue-600" /></div><p className="text-sm text-green-600 mt-2">↗ 8% from last month</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Revenue</p><p className="text-3xl font-bold text-gray-900">₹2.4M</p></div><DollarSign className="h-8 w-8 text-green-600" /></div><p className="text-sm text-green-600 mt-2">↗ 12% from last month</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Active Workers</p><p className="text-3xl font-bold text-gray-900">148</p></div><Users className="h-8 w-8 text-purple-600" /></div><p className="text-sm text-red-600 mt-2">↘ 2% from last month</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Inventory Value</p><p className="text-3xl font-bold text-gray-900">₹890K</p></div><Package className="h-8 w-8 text-orange-600" /></div><p className="text-sm text-green-600 mt-2">↗ 5% from last month</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[ { action: 'Material delivery received', time: '2 hours ago', type: 'success', icon: Package }, { action: 'Payment processed for Site A', time: '4 hours ago', type: 'info', icon: DollarSign }, { action: 'Equipment maintenance scheduled', time: '1 day ago', type: 'warning', icon: Settings }, { action: 'New project milestone achieved', time: '2 days ago', type: 'success', icon: CheckCircle }].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-full ${ activity.type === 'success' ? 'bg-green-100' : activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100' }`}><activity.icon className={`h-4 w-4 ${ activity.type === 'success' ? 'text-green-600' : activity.type === 'warning' ? 'text-yellow-600' : 'text-blue-600' }`} /></div>
                <div className="flex-1"><p className="text-sm font-medium text-gray-900">{activity.action}</p><p className="text-xs text-gray-500">{activity.time}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project) => (
              <div key={project.id} className="border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center shadow-md`}><project.icon className="h-8 w-8 text-white/80" /></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2"><h4 className="text-sm font-medium text-gray-900">{project.name}</h4><span className="text-sm text-gray-500">{project.progress}%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2"><div className={`h-2 rounded-full transition-all duration-300 ${ project.progress > 80 ? 'bg-green-500' : project.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500' }`} style={{width: `${project.progress}%`}}></div></div>
                    <div className="flex items-center justify-between"><p className="text-xs text-gray-500 flex items-center"><MapPin className="h-3 w-3 mr-1" />{project.location}</p><span className={`px-2 py-1 rounded-full text-xs font-medium ${ project.progress > 80 ? 'bg-green-100 text-green-800' : project.progress > 50 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800' }`}>{project.status}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <button onClick={() => handleAddItem('inventory item')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"><Plus className="h-4 w-4" /><span>Add Item</span></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Total Items</h3><p className="text-3xl font-bold text-blue-600">{inventory.length}</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Total Value</h3><p className="text-3xl font-bold text-green-600">₹{(inventory.reduce((sum, item) => sum + item.cost, 0) / 1000).toFixed(0)}K</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Low Stock Alert</h3><p className="text-3xl font-bold text-red-600">3</p></div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
            <div className="flex space-x-2">
              <button onClick={() => alert('Search functionality will be implemented here')} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Search className="h-4 w-4" /></button>
              <button onClick={() => alert('Filter functionality will be implemented here')} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Filter className="h-4 w-4" /></button>
              <button onClick={() => alert('Export functionality will be implemented here')} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Download className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{item.name}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{item.quantity} {item.unit}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">₹{item.cost.toLocaleString()}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{item.supplier}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex space-x-2">
                    <button onClick={() => handleEditItem('inventory item', item)} className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDeleteItem('inventory item', item)} className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TransactionsView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-900">Transaction Management</h2><button onClick={() => handleAddItem('transaction')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"><Plus className="h-4 w-4" /><span>Add Transaction</span></button></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Total Income</h3><p className="text-3xl font-bold text-green-600">₹{(transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) / 1000).toFixed(0)}K</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Total Expenses</h3><p className="text-3xl font-bold text-red-600">₹{(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) / 1000).toFixed(0)}K</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Net Profit</h3><p className="text-3xl font-bold text-blue-600">₹{((transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) - transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)) / 1000).toFixed(0)}K</p></div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{transaction.description}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>{transaction.type}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex space-x-2">
                    <button onClick={() => alert(`Viewing details for: ${transaction.description}`)} className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => handleEditItem('transaction', transaction)} className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"><Edit className="h-4 w-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AttendanceView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
        <div className="flex space-x-2">
          {user?.role === 'worker' ? (
            <>
              <button onClick={() => handleClockAction('in')} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Clock In</button>
              <button onClick={() => handleClockAction('out')} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">Clock Out</button>
            </>
          ) : (
            <button onClick={() => openModal('add_attendance')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Attendance</span>
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Present Today</h3><p className="text-3xl font-bold text-green-600">124</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Absent Today</h3><p className="text-3xl font-bold text-red-600">24</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">On Leave</h3><p className="text-3xl font-bold text-yellow-600">8</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Overtime Hours</h3><p className="text-3xl font-bold text-blue-600">156</p></div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{employee.name}</div><div className="text-sm text-gray-500 capitalize">{employee.role}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">09:15 AM</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.id === 1 ? '06:30 PM' : employee.id === 2 ? '--' : '05:45 PM'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.id === 1 ? '9.25' : employee.id === 2 ? '7.5' : '8.5'}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ employee.id === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800' }`}>{employee.id === 2 ? 'Working' : 'Complete'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const UsersView = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-900">User Management</h2><button onClick={() => handleAddItem('employee')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"><Plus className="h-4 w-4" /><span>Add Employee</span></button></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Total Employees</h3><p className="text-3xl font-bold text-blue-600">{employees.length}</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Admins</h3><p className="text-3xl font-bold text-green-600">{employees.filter(emp => emp.role === 'admin').length}</p></div>
        <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-lg font-semibold text-gray-700 mb-2">Workers</h3><p className="text-3xl font-bold text-purple-600">{employees.filter(emp => emp.role === 'worker').length}</p></div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">Employee Directory</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{employee.name}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${ employee.role === 'admin' ? 'bg-red-100 text-red-800' : employee.role === 'supervisor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800' }`}>{employee.role}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex space-x-2">
                    <button onClick={() => handleEditItem('employee', employee)} className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDeleteItem('employee', employee)} className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Main App Layout
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage />
        <Modal />
      </>
    );
  }

  if (currentView === 'login') {
    return (
      <>
        <LoginPage />
        <Modal />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <LoginPage />
        <Modal />
      </>
    );
  }

  // Logged-in user view
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'inventory' && <InventoryView />}
          {currentView === 'transactions' && <TransactionsView />}
          {currentView === 'attendance' && <AttendanceView />}
          {currentView === 'users' && user.role === 'admin' && <UsersView />}
        </main>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <Modal />
    </div>
  );
};

export default App;