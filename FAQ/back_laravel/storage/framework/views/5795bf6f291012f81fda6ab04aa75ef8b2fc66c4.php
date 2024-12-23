
<?php $__env->startSection('content'); ?>

<?php
$i = "";
$a = "";
if(!is_null($categorie)) {
$i = $categorie->slug;
$a = $categorie->name;
}

?>

<div id="createCategories" nom=<?php echo e($a); ?> slug=<?php echo e($i); ?>>
</div>
<!-- <?php if(!is_null($categorie)): ?>
<h1><?php echo e($categorie->slug); ?></h1>
<?php endif; ?> -->
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Xampp\htdocs\tuto-fullstack\FAQ\back_laravel\resources\views/categories/add.blade.php ENDPATH**/ ?>