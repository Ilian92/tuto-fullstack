<?php $__env->startSection('content'); ?>
<div class="p-3 bg-slate-100 rounded-md mx-10">
    <div class="card">
        <div class="mb-1.5"><?php echo e(__('Dashboard')); ?></div>

        <div class="">
            <?php if(session('status')): ?>
            <div class="" role="alert">
                <?php echo e(session('status')); ?>

            </div>
            <?php endif; ?>

            <?php echo e(__('You are logged in!')); ?>

        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/home.blade.php ENDPATH**/ ?>