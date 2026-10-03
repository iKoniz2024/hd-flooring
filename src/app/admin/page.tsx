'use client';

import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Layers,
  Plus,
  Pencil,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2,
  RefreshCw,
  Search,
  ArrowLeft,
  DollarSign,
  Tag,
  Lock,
  KeyRound,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  Image as ImageIcon,
  FolderKanban,
  MapPin,
  Building2,
  Sparkles
} from 'lucide-react';
import { invalidateApiCache } from '@/lib/utils/apiCache';

interface Category {
  _id: string;
  name: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  categoryName?: string;
  price: number;
  image: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectItem {
  _id: string;
  title: string;
  category: string;
  propertyType: 'Residential' | 'Commercial';
  location: string;
  coverImage: string;
  challenge?: string;
  solution?: string;
  result?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'projects'>('products');

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categorySearch, setCategorySearch] = useState('');

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedProjectCategoryFilter, setSelectedProjectCategoryFilter] = useState<string>('all');

  // Feedback banner state
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Category Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState<'add' | 'edit'>('add');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryNameInput, setCategoryNameInput] = useState('');
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<string>('');
  const [submittingCategory, setSubmittingCategory] = useState(false);

  // Product Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState<'add' | 'edit'>('add');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState('');
  const [productAdditionalFiles, setProductAdditionalFiles] = useState<File[]>([]);
  const [productAdditionalPreviews, setProductAdditionalPreviews] = useState<string[]>([]);
  const [submittingProduct, setSubmittingProduct] = useState(false);

  // Project Modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectModalMode, setProjectModalMode] = useState<'add' | 'edit'>('add');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectPropertyType, setProjectPropertyType] = useState<'Residential' | 'Commercial'>('Residential');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectChallenge, setProjectChallenge] = useState('');
  const [projectSolution, setProjectSolution] = useState('');
  const [projectResult, setProjectResult] = useState('');
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState('');
  const [projectAdditionalFiles, setProjectAdditionalFiles] = useState<File[]>([]);
  const [projectAdditionalPreviews, setProjectAdditionalPreviews] = useState<string[]>([]);
  const [submittingProject, setSubmittingProject] = useState(false);

  // Delete confirmation modal state
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'product' | 'category' | 'project';
    id: string;
    title: string;
  }>({ isOpen: false, type: 'product', id: '', title: '' });
  const [deletingItem, setDeletingItem] = useState(false);

  // Show feedback notice
  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback(null);
    }, 5000);
  };

  // Fetch Categories
  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch('/api/categories', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
        invalidateApiCache('/api/categories');
      } else {
        showFeedback(data.error || 'Failed to fetch categories', 'error');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      showFeedback('Database connection or network error fetching categories', 'error');
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // Fetch Products
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
        invalidateApiCache('/api/products');
      } else {
        showFeedback(data.error || 'Failed to fetch products', 'error');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showFeedback('Database connection or network error fetching products', 'error');
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch Projects
  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
        invalidateApiCache('/api/projects');
      } else {
        showFeedback(data.error || 'Failed to fetch projects', 'error');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      showFeedback('Database connection or network error fetching projects', 'error');
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // Initial Auth Check
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      fetchCategories();
      fetchProducts();
      fetchProjects();
    }
    setCheckingAuth(false);
  }, [fetchCategories, fetchProducts, fetchProjects]);

  // Clean up ObjectURL preview memory leak
  useEffect(() => {
    return () => {
      if (productImagePreview && productImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(productImagePreview);
      }
      if (projectImagePreview && projectImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(projectImagePreview);
      }
    };
  }, [productImagePreview, projectImagePreview]);

  // Login Submit Handler
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) return;

    setAuthenticating(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), password: passwordInput }),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('admin_authenticated', 'true');
        setIsAuthenticated(true);
        setPasswordInput('');
        fetchCategories();
        fetchProducts();
        fetchProjects();
      } else {
        setLoginError(data.error || 'Incorrect email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred while authenticating.');
    } finally {
      setAuthenticating(false);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  // Handle Category Modal Open
  const openAddCategoryModal = () => {
    setCategoryModalMode('add');
    setEditingCategory(null);
    setCategoryNameInput('');
    setCategoryImageFile(null);
    setCategoryImagePreview('');
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: Category) => {
    setCategoryModalMode('edit');
    setEditingCategory(cat);
    setCategoryNameInput(cat.name);
    setCategoryImageFile(null);
    setCategoryImagePreview(cat.image || '');
    setIsCategoryModalOpen(true);
  };

  // Submit Category
  const handleCategorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryNameInput.trim()) {
      showFeedback('Category name cannot be empty.', 'error');
      return;
    }

    if (!categoryImageFile && !categoryImagePreview) {
      showFeedback('Category cover image is strictly required. Please upload an image.', 'error');
      return;
    }

    setSubmittingCategory(true);
    try {
      let finalCategoryImageUrl = categoryImagePreview;

      if (categoryImageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', categoryImageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          showFeedback(uploadData.error || 'Failed to upload category image.', 'error');
          setSubmittingCategory(false);
          return;
        }
        finalCategoryImageUrl = uploadData.url;
      }

      if (!finalCategoryImageUrl) {
        showFeedback('Category cover image is strictly required. Please upload an image.', 'error');
        setSubmittingCategory(false);
        return;
      }

      const isEdit = categoryModalMode === 'edit' && editingCategory;
      const url = isEdit ? `/api/categories/${editingCategory._id}` : '/api/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: categoryNameInput.trim(),
          image: finalCategoryImageUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        showFeedback(data.message || (isEdit ? 'Category updated successfully.' : 'Category added successfully.'), 'success');
        setIsCategoryModalOpen(false);
        setCategoryNameInput('');
        setCategoryImageFile(null);
        setCategoryImagePreview('');
        fetchCategories();
        fetchProducts();
      } else {
        showFeedback(data.error || 'Failed to save category', 'error');
      }
    } catch (error) {
      console.error('Category submit error:', error);
      showFeedback('An error occurred while saving category', 'error');
    } finally {
      setSubmittingCategory(false);
    }
  };

  // Handle Product Modal Open
  const openAddProductModal = () => {
    setProductModalMode('add');
    setEditingProduct(null);
    setProductTitle('');
    setProductDescription('');
    setProductCategory(categories.length > 0 ? categories[0]._id : '');
    setProductPrice('');
    setProductImageFile(null);
    setProductImagePreview('');
    setProductAdditionalFiles([]);
    setProductAdditionalPreviews([]);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setProductModalMode('edit');
    setEditingProduct(prod);
    setProductTitle(prod.title);
    setProductDescription(prod.description);
    setProductCategory(prod.category);
    setProductPrice(String(prod.price));
    setProductImageFile(null);
    setProductImagePreview(prod.image);
    setProductAdditionalFiles([]);
    setProductAdditionalPreviews(Array.isArray(prod.images) ? prod.images : []);
    setIsProductModalOpen(true);
  };

  // Handle Main Image File Selection
  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showFeedback('Please select a valid image file (JPG, PNG, WEBP, etc.)', 'error');
        return;
      }
      setProductImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProductImagePreview(previewUrl);
    }
  };

  // Handle Additional Images File Selection
  const handleAdditionalImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      }
    }

    setProductAdditionalFiles((prev) => [...prev, ...validFiles]);
    setProductAdditionalPreviews((prev) => [...prev, ...validPreviews]);
  };

  // Remove individual additional image
  const removeAdditionalImage = (indexToRemove: number) => {
    setProductAdditionalPreviews((prevPreviews) =>
      prevPreviews.filter((_, idx) => idx !== indexToRemove)
    );
    // Find if this preview maps to a new file or existing url
    let fileCounter = 0;
    setProductAdditionalFiles((prevFiles) => {
      return prevFiles.filter((_, idx) => {
        // match index against previews that are blob urls
        const match = idx !== indexToRemove;
        return match;
      });
    });
  };

  // Submit Product
  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!productTitle.trim()) {
      showFeedback('Product title cannot be empty.', 'error');
      return;
    }

    if (!productDescription.trim()) {
      showFeedback('Product description cannot be empty.', 'error');
      return;
    }

    if (!productCategory) {
      showFeedback('Please select a category.', 'error');
      return;
    }

    const priceNum = Number(productPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      showFeedback('Price must be a positive number greater than 0.', 'error');
      return;
    }

    if (productModalMode === 'add' && !productImageFile && !productImagePreview) {
      showFeedback('Product main image is required.', 'error');
      return;
    }

    setSubmittingProduct(true);

    try {
      let finalMainImageUrl = productImagePreview;

      // 1. Upload Main Image if changed
      if (productImageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', productImageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          showFeedback(uploadData.error || 'Failed to upload main image.', 'error');
          setSubmittingProduct(false);
          return;
        }
        finalMainImageUrl = uploadData.url;
      }

      // 2. Upload Additional Images
      const finalAdditionalImages: string[] = [];

      // Retain existing uploaded URLs (that don't start with blob:)
      for (const preview of productAdditionalPreviews) {
        if (!preview.startsWith('blob:')) {
          finalAdditionalImages.push(preview);
        }
      }

      // Upload newly added File objects
      for (const file of productAdditionalFiles) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success && uploadData.url) {
          finalAdditionalImages.push(uploadData.url);
        }
      }

      const isEdit = productModalMode === 'edit' && editingProduct;
      const url = isEdit ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        title: productTitle.trim(),
        description: productDescription.trim(),
        category: productCategory,
        price: priceNum,
        image: finalMainImageUrl,
        images: finalAdditionalImages,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        showFeedback(data.message || (isEdit ? 'Product updated successfully.' : 'Product added successfully.'), 'success');
        setIsProductModalOpen(false);
        fetchProducts();
      } else {
        showFeedback(data.error || 'Failed to save product.', 'error');
      }
    } catch (error) {
      console.error('Product submit error:', error);
      showFeedback('An error occurred while saving product.', 'error');
    } finally {
      setSubmittingProduct(false);
    }
  };

  // Handle Project Modal Open
  const openAddProjectModal = () => {
    setProjectModalMode('add');
    setEditingProject(null);
    setProjectTitle('');
    setProjectCategory(categories.length > 0 ? categories[0].name : '');
    setProjectPropertyType('Residential');
    setProjectLocation('');
    setProjectChallenge('');
    setProjectSolution('');
    setProjectResult('');
    setProjectImageFile(null);
    setProjectImagePreview('');
    setProjectAdditionalFiles([]);
    setProjectAdditionalPreviews([]);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: ProjectItem) => {
    setProjectModalMode('edit');
    setEditingProject(proj);
    setProjectTitle(proj.title);
    setProjectCategory(proj.category || (categories.length > 0 ? categories[0].name : ''));
    setProjectPropertyType(proj.propertyType || 'Residential');
    setProjectLocation(proj.location || '');
    setProjectChallenge(proj.challenge || '');
    setProjectSolution(proj.solution || '');
    setProjectResult(proj.result || '');
    setProjectImageFile(null);
    setProjectImagePreview(proj.coverImage);
    setProjectAdditionalFiles([]);
    setProjectAdditionalPreviews((proj as any).galleryImages || []);
    setIsProjectModalOpen(true);
  };

  // Handle Project Main Image File Selection
  const handleProjectImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showFeedback('Please select a valid image file (JPG, PNG, WEBP, etc.)', 'error');
        return;
      }
      setProjectImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProjectImagePreview(previewUrl);
    }
  };

  // Handle Project Additional Images File Selection
  const handleProjectAdditionalImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      }
    }

    setProjectAdditionalFiles((prev) => [...prev, ...validFiles]);
    setProjectAdditionalPreviews((prev) => [...prev, ...validPreviews]);
  };

  const removeProjectAdditionalImage = (indexToRemove: number) => {
    setProjectAdditionalPreviews((prevPreviews) =>
      prevPreviews.filter((_, idx) => idx !== indexToRemove)
    );
    setProjectAdditionalFiles((prevFiles) => {
      return prevFiles.filter((_, idx) => idx !== indexToRemove);
    });
  };

  // Submit Project
  const handleProjectSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!projectTitle.trim()) {
      showFeedback('Project title cannot be empty.', 'error');
      return;
    }

    if (!projectLocation.trim()) {
      showFeedback('Project location is required.', 'error');
      return;
    }

    if (projectModalMode === 'add' && !projectImageFile && !projectImagePreview) {
      showFeedback('Project cover image is required.', 'error');
      return;
    }

    setSubmittingProject(true);

    try {
      let finalImageUrl = projectImagePreview;

      if (projectImageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', projectImageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          showFeedback(uploadData.error || 'Failed to upload project image.', 'error');
          setSubmittingProject(false);
          return;
        }
        finalImageUrl = uploadData.url;
      }

      // Upload additional gallery images if selected
      const finalAdditionalImageUrls: string[] = [];
      for (const previewUrl of projectAdditionalPreviews) {
        if (!previewUrl.startsWith('blob:')) {
          finalAdditionalImageUrls.push(previewUrl);
        }
      }

      for (const addFile of projectAdditionalFiles) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', addFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success && uploadData.url) {
          finalAdditionalImageUrls.push(uploadData.url);
        }
      }

      const allGalleryImages = Array.from(new Set([finalImageUrl, ...finalAdditionalImageUrls]));

      const isEdit = projectModalMode === 'edit' && editingProject;
      const url = isEdit ? `/api/projects/${editingProject._id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        title: projectTitle.trim(),
        category: projectCategory.trim() || 'Flooring Project',
        propertyType: projectPropertyType,
        location: projectLocation.trim(),
        coverImage: finalImageUrl,
        galleryImages: allGalleryImages,
        challenge: projectChallenge.trim(),
        solution: projectSolution.trim(),
        result: projectResult.trim(),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        showFeedback(data.message || (isEdit ? 'Project updated successfully.' : 'Project added successfully.'), 'success');
        setIsProjectModalOpen(false);
        fetchProjects();
      } else {
        showFeedback(data.error || 'Failed to save project.', 'error');
      }
    } catch (error) {
      console.error('Project submit error:', error);
      showFeedback('An error occurred while saving project.', 'error');
    } finally {
      setSubmittingProject(false);
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteModalState.id) return;
    setDeletingItem(true);

    try {
      const endpoint = deleteModalState.type === 'category'
        ? `/api/categories/${deleteModalState.id}`
        : deleteModalState.type === 'project'
        ? `/api/projects/${deleteModalState.id}`
        : `/api/products/${deleteModalState.id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        showFeedback(
          data.message || `${deleteModalState.type.charAt(0).toUpperCase() + deleteModalState.type.slice(1)} deleted successfully.`,
          'success'
        );
        setDeleteModalState({ isOpen: false, type: 'product', id: '', title: '' });
        if (deleteModalState.type === 'category') {
          fetchCategories();
          fetchProducts();
        } else if (deleteModalState.type === 'project') {
          fetchProjects();
        } else {
          fetchProducts();
        }
      } else {
        showFeedback(data.error || 'Failed to delete item.', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showFeedback('An error occurred while deleting item.', 'error');
    } finally {
      setDeletingItem(false);
    }
  };

  // Filtered lists for UI search
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(productSearch.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Render Loading screen during Auth check
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
        <p className="text-xs font-semibold text-stone-500">Checking credentials...</p>
      </div>
    );
  }

  // Render Password Verification Screen if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight font-outfit text-stone-900 dark:text-white">
              HD Flooring Admin Portal
            </h2>
            <p className="text-xs text-stone-500">
              Enter the admin access password to manage products & categories.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter admin email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authenticating}
              className="w-full py-3 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {authenticating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Admin Panel</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-[#E85D04] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 rounded-xl bg-stone-200/60 dark:bg-stone-800/60 hover:bg-[#E85D04] hover:text-white transition-all"
                title="Back to Website Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-outfit text-stone-900 dark:text-white flex items-center gap-2">
                  <span>Admin Dashboard</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                    Secured
                  </span>
                </h1>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Manage products, categories, images & inventory database
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchCategories();
                fetchProducts();
                fetchProjects();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-semibold transition-all border border-rose-500/20"
              title="Lock Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between border shadow-md transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span className="text-sm font-semibold">{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Section Navigation Tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all ${
                activeTab === 'products'
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all ${
                activeTab === 'categories'
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all ${
                activeTab === 'projects'
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Project Gallery</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300">
                {projects.length}
              </span>
            </button>
          </div>

          <div>
            {activeTab === 'products' ? (
              <button
                onClick={openAddProductModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            ) : activeTab === 'categories' ? (
              <button
                onClick={openAddCategoryModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            ) : (
              <button
                onClick={openAddProjectModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* PRODUCTS TAB CONTENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search products by title, description, or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 shrink-0">
                  Category:
                </label>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products List Table / Grid */}
            {loadingProducts ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
                <p className="text-sm text-stone-500">Loading products from database...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">No Products Found</h3>
                  <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                    {productSearch || selectedCategoryFilter !== 'all'
                      ? 'No products match your search or category filter.'
                      : 'Get started by creating your first product using the Add Product button.'}
                  </p>
                </div>
                {categories.length === 0 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl inline-block border border-amber-200 dark:border-amber-800">
                    ⚠️ Note: You need to add at least one Category before creating products.
                  </p>
                )}
                <div>
                  <button
                    onClick={openAddProductModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Add Product Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-stone-400">
                          <ImageIcon className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-stone-900/80 text-white backdrop-blur-md">
                          {product.categoryName || 'Uncategorized'}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E85D04] text-white shadow-md">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-stone-900 dark:text-white line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-stone-400">
                          ID: {product._id.substring(product._id.length - 6)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditProductModal(product)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() =>
                              setDeleteModalState({
                                isOpen: true,
                                type: 'product',
                                id: product._id,
                                title: product.title,
                              })
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CATEGORIES TAB CONTENT */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search category name..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                />
              </div>
            </div>

            {/* Categories List */}
            {loadingCategories ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
                <p className="text-sm text-stone-500">Loading categories from database...</p>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">No Categories Found</h3>
                  <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                    {categorySearch
                      ? 'No categories match your search term.'
                      : 'Create categories to organize your flooring products.'}
                  </p>
                </div>
                <div>
                  <button
                    onClick={openAddCategoryModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Add Category Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-100/70 dark:bg-stone-800/70 border-b border-stone-200 dark:border-stone-800 text-xs uppercase font-extrabold text-stone-600 dark:text-stone-400">
                        <th className="py-3.5 px-6">Category Name</th>
                        <th className="py-3.5 px-6">Total Products</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
                      {filteredCategories.map((category) => {
                        const count = products.filter((p) => p.category === category._id).length;

                        return (
                          <tr
                            key={category._id}
                            className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                          >
                            <td className="py-4 px-6 font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
                              {category.image ? (
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 shrink-0 bg-stone-100 dark:bg-stone-800">
                                  <Image src={category.image} alt={category.name} fill sizes="40px" className="object-cover" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-stone-800 text-[#E85D04] flex items-center justify-center shrink-0">
                                  <Layers className="w-5 h-5" />
                                </div>
                              )}
                              <span>{category.name}</span>
                            </td>

                            <td className="py-4 px-6 text-stone-600 dark:text-stone-400 font-medium">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-bold text-stone-800 dark:text-stone-200">
                                <Package className="w-3 h-3 text-[#E85D04]" />
                                {count} {count === 1 ? 'Product' : 'Products'}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditCategoryModal(category)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() =>
                                    setDeleteModalState({
                                      isOpen: true,
                                      type: 'category',
                                      id: category._id,
                                      title: category.name,
                                    })
                                  }
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROJECTS TAB CONTENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search projects by title, location, or category..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] transition-all"
                />
              </div>
            </div>

            {/* Projects Grid */}
            {loadingProjects ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
                <p className="text-sm text-stone-500">Loading project gallery from database...</p>
              </div>
            ) : projects.filter((p) =>
                p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
                p.category.toLowerCase().includes(projectSearch.toLowerCase())
              ).length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-stone-800 flex items-center justify-center text-[#E85D04]">
                  <FolderKanban className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">No Projects Found</h3>
                  <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                    {projectSearch
                      ? 'No projects match your search term.'
                      : 'Add completed flooring showcase projects to populate your website gallery.'}
                  </p>
                </div>
                <div>
                  <button
                    onClick={openAddProjectModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Add Project Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) =>
                    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                    p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
                    p.category.toLowerCase().includes(projectSearch.toLowerCase())
                  )
                  .map((project) => (
                    <div
                      key={project._id}
                      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      {/* Image Container */}
                      <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                        {project.coverImage ? (
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-stone-400">
                            <ImageIcon className="w-10 h-10" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-stone-900/80 text-white backdrop-blur-md">
                            {project.category}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E85D04]/90 text-white backdrop-blur-md">
                            {project.propertyType}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E85D04] mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{project.location}</span>
                          </div>
                          <h3 className="text-base font-bold text-stone-900 dark:text-white line-clamp-2">
                            {project.title}
                          </h3>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-stone-400">
                            ID: {project._id.substring(project._id.length - 6)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditProjectModal(project)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#E85D04] hover:text-white text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() =>
                                setDeleteModalState({
                                  isOpen: true,
                                  type: 'project',
                                  id: project._id,
                                  title: project.title,
                                })
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* CATEGORY ADD/EDIT MODAL */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {categoryModalMode === 'edit' ? 'Edit Category' : 'Add New Category'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                    Category Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hardwood Flooring, Vinyl Planks"
                      value={categoryNameInput}
                      onChange={(e) => setCategoryNameInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1.5">
                    Category name must be unique.
                  </p>
                </div>

                {/* Category Banner Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                    Category Main Cover Image <span className="text-rose-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
                    <Upload className="w-5 h-5 text-[#E85D04] mb-1" />
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Click to upload Category Cover Image
                    </span>
                    <span className="text-[11px] text-stone-500 mt-0.5 text-center">
                      This image will be displayed on the page hero & service cards
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (!file.type.startsWith('image/')) {
                            showFeedback('Please select a valid image file', 'error');
                            return;
                          }
                          setCategoryImageFile(file);
                          setCategoryImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {categoryImagePreview && (
                    <div className="relative mt-3 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 h-36 bg-stone-100 dark:bg-stone-800">
                      <Image
                        src={categoryImagePreview}
                        alt="Category cover preview"
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCategoryImageFile(null);
                          setCategoryImagePreview('');
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow-md"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingCategory}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 disabled:opacity-50"
                  >
                    {submittingCategory ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{categoryModalMode === 'edit' ? 'Update Category' : 'Save Category'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PRODUCT ADD/EDIT MODAL */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 my-8">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {productModalMode === 'edit' ? 'Edit Product' : 'Add New Product'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Premium White Oak Hardwood Plank"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                  />
                </div>

                {/* Category & Price Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                    >
                      <option value="" disabled>
                        Select Category...
                      </option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                      Price ($) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        required
                        placeholder="e.g. 7.99"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter detailed description of flooring material, dimensions, finish, durability..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                  />
                </div>

                {/* 1. Main Primary Image */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Main Primary Image <span className="text-rose-500">*</span>
                  </label>

                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
                      <Upload className="w-5 h-5 text-[#E85D04] mb-1" />
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        {productImageFile
                          ? productImageFile.name
                          : 'Select main primary image file'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>

                    {/* Main Preview Container */}
                    {productImagePreview && (
                      <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 h-32 bg-stone-100 dark:bg-stone-800">
                        <Image
                          src={productImagePreview}
                          alt="Main Product preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/70 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-wider">
                          Primary Image Preview
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Additional Gallery Images */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Additional Gallery Images (Optional)
                  </label>

                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
                      <ImageIcon className="w-5 h-5 text-[#E85D04] mb-1" />
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        Click to add multiple additional photos
                      </span>
                      <span className="text-[11px] text-stone-500 mt-0.5">
                        Select one or more images for the product detail gallery
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                        className="hidden"
                      />
                    </label>

                    {/* Additional Images Grid Previews */}
                    {productAdditionalPreviews.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {productAdditionalPreviews.map((previewUrl, idx) => (
                          <div
                            key={idx}
                            className="relative h-20 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 group bg-stone-100 dark:bg-stone-800"
                          >
                            <Image
                              src={previewUrl}
                              alt={`Additional photo ${idx + 1}`}
                              fill
                              sizes="100px"
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(idx)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-80 group-hover:opacity-100 hover:bg-rose-700 transition-all shadow-md"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <span className="absolute bottom-1 left-1 text-[9px] font-black text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                              #{idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingProduct}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 disabled:opacity-50"
                  >
                    {submittingProduct ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading & Saving...</span>
                      </>
                    ) : (
                      <span>{productModalMode === 'edit' ? 'Update Product' : 'Save Product'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PROJECT ADD/EDIT MODAL */}
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl space-y-6 my-8">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {projectModalMode === 'edit' ? 'Edit Project Gallery Item' : 'Add New Project'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Details & WH-Descriptions */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Project Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Modern Luxury Sheet Vinyl Installation in Dental Clinic"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                      />
                    </div>

                    {/* Category & Property Type Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                          Category / Flooring Type <span className="text-rose-500">*</span>
                        </label>
                        <select
                          required
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        >
                          <option value="" disabled>
                            Select Category...
                          </option>
                          {categories.map((c) => (
                            <option key={c._id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                          {projectCategory && !categories.some((c) => c.name === projectCategory) && (
                            <option value={projectCategory}>{projectCategory}</option>
                          )}
                        </select>
                      </div>

                      {/* Property Type */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                          Property Type <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={projectPropertyType}
                          onChange={(e) => setProjectPropertyType(e.target.value as 'Residential' | 'Commercial')}
                          className="w-full px-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Location / City <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Saskatoon & Area, Regina, SK"
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>
                    </div>

                    {/* Project Description & Case Study Details (WH-Questions Guidance) */}
                    <div className="p-4 rounded-2xl bg-[#FAF6F0] dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#E85D04] uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#E85D04]" />
                        <span>Project Description & Story (WH-Question Format)</span>
                      </div>

                      {/* 1. What & Why (Challenge / Scope) */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                          1. Project Scope & Challenge <span className="text-stone-400 font-normal">(WHAT & WHY)</span>
                        </label>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 leading-relaxed">
                          💡 <strong>What</strong> was the project and <strong>Why</strong> was it needed? Describe client requirement or site condition.
                        </p>
                        <textarea
                          rows={2}
                          placeholder="e.g. High-hygiene commercial dental clinic needed 100% watertight flooring compliant with SK health regulations..."
                          value={projectChallenge}
                          onChange={(e) => setProjectChallenge(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>

                      {/* 2. How (Solution & Execution) */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                          2. HD Flooring Execution <span className="text-stone-400 font-normal">(HOW & SYSTEM)</span>
                        </label>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 leading-relaxed">
                          💡 <strong>How</strong> did HD Flooring install/solve it? Mention floor prep, installation method, or materials.
                        </p>
                        <textarea
                          rows={2}
                          placeholder="e.g. Installed heat-welded PVC sheet vinyl over self-leveled subfloor with seamless wall flash coving..."
                          value={projectSolution}
                          onChange={(e) => setProjectSolution(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>

                      {/* 3. Outcome & Result */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                          3. Final Result & Benefits <span className="text-stone-400 font-normal">(OUTCOME)</span>
                        </label>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 leading-relaxed">
                          💡 What was the <strong>final result</strong> and benefit to the property owner?
                        </p>
                        <textarea
                          rows={2}
                          placeholder="e.g. Flawless anti-bacterial floor, easy to sanitize, 100% watertight with zero foot noise."
                          value={projectResult}
                          onChange={(e) => setProjectResult(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#E85D04] font-medium transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Photo Uploads & Previews */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Cover Image Upload */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Project Cover Photo <span className="text-rose-500">*</span>
                      </label>

                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] dark:hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
                          <Upload className="w-6 h-6 text-[#E85D04] mb-1" />
                          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 text-center">
                            {projectImageFile
                              ? projectImageFile.name
                              : 'Click to select or drop project photo'}
                          </span>
                          <span className="text-[11px] text-stone-500 mt-0.5">
                            PNG, JPG, WEBP or GIF supported
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProjectImageFileChange}
                            className="hidden"
                          />
                        </label>

                        {/* Preview Container */}
                        {projectImagePreview && (
                          <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 h-44 bg-stone-100 dark:bg-stone-800">
                            <Image
                              src={projectImagePreview}
                              alt="Project photo preview"
                              fill
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white text-[11px] font-semibold">
                              Main Cover Photo Preview
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Project Gallery Photos */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                        Additional Project Gallery Photos (Optional)
                      </label>
                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#E85D04] rounded-2xl cursor-pointer bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 transition-all">
                          <Upload className="w-5 h-5 text-[#E85D04] mb-1" />
                          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 text-center">
                            Click to select multiple gallery photos
                          </span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleProjectAdditionalImagesChange}
                            className="hidden"
                          />
                        </label>

                        {projectAdditionalPreviews.length > 0 && (
                          <div className="grid grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                            {projectAdditionalPreviews.map((imgUrl, idx) => (
                              <div key={idx} className="relative group rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 h-20 bg-stone-100 dark:bg-stone-800">
                                <Image
                                  src={imgUrl}
                                  alt={`Project gallery preview ${idx + 1}`}
                                  fill
                                  sizes="100px"
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeProjectAdditionalImage(idx)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingProject}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#d95b16] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E85D04]/20 disabled:opacity-50"
                  >
                    {submittingProject ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Project...</span>
                      </>
                    ) : (
                      <span>{projectModalMode === 'edit' ? 'Update Project' : 'Save Project'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteModalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                <Trash2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                  Confirm Delete
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
                  Are you sure you want to delete{' '}
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    &quot;{deleteModalState.title}&quot;
                  </span>
                  ? This operation cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModalState({ isOpen: false, type: 'product', id: '', title: '' })}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deletingItem}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-600/20 disabled:opacity-50"
                >
                  {deletingItem ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Yes, Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
